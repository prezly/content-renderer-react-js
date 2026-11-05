'use client';

import { UPLOADCARE_CDN_URL, UploadcareImage } from '@prezly/uploadcare';
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import type { Rgb } from './color';
import { getBackgroundBehind, loadImagePixels } from './dom';
import { needsTransparencyBackdrop } from './needsTransparencyBackdrop';

const SAMPLE_SIZE = 64;
const TRANSPARENCY_CAPABLE_TYPES = new Set([
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/avif',
    'image/heic',
    'image/tiff',
]);

/** Effects that only scale or re-encode the image; they do not change which pixels are shown. */
const SCALING_EFFECT = /^\/(preview|resize|format|quality|progressive)\//;

/** Sample pixels per URL, shared by every element and background that shows the same image. */
const samples = new Map<string, Promise<Uint8ClampedArray | null>>();

/**
 * Whether an image may contain transparent pixels, judging by its file type.
 * GIFs are rendered as videos, so they are excluded.
 */
export function mayHaveTransparency(image: Pick<UploadcareImage, 'mimeType'>): boolean {
    return TRANSPARENCY_CAPABLE_TYPES.has(image.mimeType.toLowerCase());
}

/**
 * The tiny PNG used to inspect an image's pixels. It keeps effects that change the shown
 * area (crops), but drops scaling ones, so every rendered size of an image shares one sample.
 *
 * The sample always comes from the Uploadcare CDN host, which sends CORS headers. Custom CDN
 * domains (e.g. `cdn.assets.prezly.com`) redirect there without them, and a canvas cannot read
 * pixels through such a redirect.
 */
export function getTransparencySampleUrl(image: UploadcareImage): string {
    const base = new UploadcareImage({
        uuid: image.uuid,
        filename: image.filename,
        mimeType: image.mimeType,
        size: image.size,
        originalWidth: image.originalWidth,
        originalHeight: image.originalHeight,
        effects: image.effects.filter((effect) => !SCALING_EFFECT.test(effect)),
        baseCdnUrl: UPLOADCARE_CDN_URL,
    });
    return base.preview(SAMPLE_SIZE, SAMPLE_SIZE).format('png').cdnUrl;
}

function loadSample(sampleUrl: string): Promise<Uint8ClampedArray | null> {
    let sample = samples.get(sampleUrl);
    if (!sample) {
        sample = loadImagePixels(sampleUrl).catch(() => null);
        samples.set(sampleUrl, sample);
    }
    return sample;
}

async function decide(sampleUrl: string, background: Rgb | null): Promise<boolean> {
    // Without a known solid backdrop we cannot judge contrast, so keep showing the checkerboard.
    if (!background) {
        return true;
    }

    const pixels = await loadSample(sampleUrl);
    // The sample could not be read: fall back to showing the checkerboard.
    return pixels ? needsTransparencyBackdrop(pixels, background) : true;
}

/**
 * Returns `true` when `image` has transparent areas that would blend into the colour
 * behind `elementRef`, so a checkerboard backdrop is needed to keep it visible.
 *
 * The check runs in the browser once the element is near the viewport, using a 64px PNG
 * sample from the CDN. Opaque formats (JPEG) and GIFs are never checked.
 */
export function useTransparencyBackdrop(
    image: UploadcareImage | null | undefined,
    elementRef: RefObject<Element | null>,
): boolean {
    const [isNeeded, setNeeded] = useState(false);
    const sampleUrl = image && mayHaveTransparency(image) ? getTransparencySampleUrl(image) : null;

    useEffect(() => {
        setNeeded(false);

        const element = elementRef.current;
        if (!sampleUrl || !element || typeof window === 'undefined') {
            return undefined;
        }

        let isCancelled = false;
        const run = () => {
            decide(sampleUrl, getBackgroundBehind(element)).then((result) => {
                if (!isCancelled) {
                    setNeeded(result);
                }
            });
        };

        if (typeof IntersectionObserver === 'undefined') {
            run();
            return () => {
                isCancelled = true;
            };
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    observer.disconnect();
                    run();
                }
            },
            { rootMargin: '200px' },
        );
        observer.observe(element);

        return () => {
            isCancelled = true;
            observer.disconnect();
        };
    }, [sampleUrl, elementRef]);

    return isNeeded;
}
