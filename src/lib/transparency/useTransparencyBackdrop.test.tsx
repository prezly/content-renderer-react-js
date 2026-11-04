import { UploadcareImage } from '@prezly/uploadcare';
import { render, waitFor } from '@testing-library/react';
import { useRef } from 'react';

import {
    getTransparencySampleUrl,
    mayHaveTransparency,
    useTransparencyBackdrop,
} from './useTransparencyBackdrop';

const WHITE_ON_TRANSPARENT = Uint8ClampedArray.from([255, 255, 255, 255, 0, 0, 0, 0]);

/** Requested sample URLs; `failing` URLs trigger `onerror`. */
const requested: string[] = [];
const failing = new Set<string>();

class FakeImage {
    crossOrigin = '';
    decoding = '';
    naturalWidth = 2;
    naturalHeight = 1;
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    set src(url: string) {
        requested.push(url);
        setTimeout(() => {
            if ([...failing].some((part) => url.includes(part))) {
                this.onerror?.();
            } else {
                this.onload?.();
            }
        });
    }
}

const originalImage = window.Image;
const originalGetContext = HTMLCanvasElement.prototype.getContext;

beforeAll(() => {
    window.Image = FakeImage as unknown as typeof Image;
    HTMLCanvasElement.prototype.getContext = (() => ({
        drawImage: () => undefined,
        getImageData: () => ({ data: WHITE_ON_TRANSPARENT }),
    })) as unknown as typeof originalGetContext;
});

afterAll(() => {
    window.Image = originalImage;
    HTMLCanvasElement.prototype.getContext = originalGetContext;
});

beforeEach(() => {
    requested.length = 0;
    failing.clear();
});

function createImage(uuid: string, mimeType: string) {
    return new UploadcareImage({
        uuid,
        filename: 'logo',
        mimeType,
        size: 1,
        originalWidth: 100,
        originalHeight: 100,
        effects: [],
    });
}

function Probe({ image, background }: { image: UploadcareImage; background: string }) {
    const ref = useRef<HTMLImageElement>(null);
    const needsBackdrop = useTransparencyBackdrop(image, ref);
    return (
        <div style={{ backgroundColor: background }}>
            <img alt="" ref={ref} data-backdrop={String(needsBackdrop)} />
        </div>
    );
}

function backdropOf(container: HTMLElement) {
    return container.querySelector('img')?.getAttribute('data-backdrop');
}

describe('useTransparencyBackdrop', () => {
    it('only checks formats that can be transparent', () => {
        expect(mayHaveTransparency(createImage('a', 'image/png'))).toBe(true);
        expect(mayHaveTransparency(createImage('a', 'image/webp'))).toBe(true);
        expect(mayHaveTransparency(createImage('a', 'image/jpeg'))).toBe(false);
        expect(mayHaveTransparency(createImage('a', 'image/gif'))).toBe(false);
    });

    it('enables the backdrop for white artwork on white, using a small PNG sample', async () => {
        const { container } = render(
            <Probe image={createImage('white-1', 'image/png')} background="rgb(255, 255, 255)" />,
        );

        await waitFor(() => expect(backdropOf(container)).toBe('true'));
        expect(requested).toEqual([
            expect.stringContaining('white-1/-/preview/64x64/-/format/png/'),
        ]);
    });

    it('keeps white artwork plain on a dark background', async () => {
        const { container } = render(
            <Probe image={createImage('white-2', 'image/png')} background="rgb(17, 24, 39)" />,
        );

        await waitFor(() => expect(requested).toHaveLength(1));
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(backdropOf(container)).toBe('false');
    });

    it('does not load samples for JPEGs', async () => {
        const { container } = render(
            <Probe image={createImage('photo', 'image/jpeg')} background="rgb(255, 255, 255)" />,
        );

        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(requested).toHaveLength(0);
        expect(backdropOf(container)).toBe('false');
    });

    it('falls back to the backdrop when the sample cannot be read', async () => {
        failing.add('broken');
        const { container } = render(
            <Probe image={createImage('broken', 'image/png')} background="rgb(17, 24, 39)" />,
        );

        await waitFor(() => expect(backdropOf(container)).toBe('true'));
    });

    it('shares one sample across rendered sizes and backgrounds', async () => {
        const image = createImage('cached', 'image/png');
        const { container } = render(
            <>
                <Probe image={image.preview(1500, 1000)} background="rgb(255, 255, 255)" />
                <Probe image={image.preview(2000, 1000)} background="rgb(17, 24, 39)" />
            </>,
        );

        await waitFor(() =>
            expect(
                [...container.querySelectorAll('img')].map((img) =>
                    img.getAttribute('data-backdrop'),
                ),
            ).toEqual(['true', 'false']),
        );
        expect(requested).toEqual([
            expect.stringMatching(/cached\/-\/preview\/64x64\/-\/format\/png\/logo$/),
        ]);
    });

    it('keeps crops in the sample, so it matches the shown area', () => {
        const image = createImage('cropped', 'image/png').crop(50, 50).preview(800, 800);
        expect(getTransparencySampleUrl(image)).toMatch(
            /cropped\/-\/crop\/50x50\/-\/preview\/64x64\/-\/format\/png\/logo$/,
        );
    });
});
