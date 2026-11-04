import type { Rgb } from './color';
import { composite, contrastRatio } from './color';

/**
 * A composited pixel with a lower contrast ratio than this against the background
 * is treated as blending into it. White on white is 1.0; #e6e6e6 on white is ~1.25.
 */
export const MIN_VISIBLE_CONTRAST = 1.25;

/**
 * Share of pixels that must be at least partly see-through before the image
 * counts as transparent at all. Opaque images never need the backdrop.
 */
export const MIN_TRANSPARENT_SHARE = 0.05;

/**
 * Share of the visible (alpha-weighted) image that must blend into the background
 * before the backdrop is shown.
 */
export const MIN_BLENDING_SHARE = 0.5;

const FULLY_TRANSPARENT_ALPHA = 5;
const FULLY_OPAQUE_ALPHA = 250;

/**
 * Decide whether a transparent image would be (largely) invisible against `background`.
 *
 * `pixels` is RGBA data, as returned by `CanvasRenderingContext2D.getImageData()`.
 */
export function needsTransparencyBackdrop(pixels: ArrayLike<number>, background: Rgb): boolean {
    const pixelCount = Math.floor(pixels.length / 4);
    if (pixelCount === 0) {
        return false;
    }

    let seeThroughPixels = 0;
    let visibleWeight = 0;
    let blendingWeight = 0;

    for (let offset = 0; offset < pixelCount * 4; offset += 4) {
        const alpha = pixels[offset + 3];

        if (alpha < FULLY_OPAQUE_ALPHA) {
            seeThroughPixels += 1;
        }

        if (alpha <= FULLY_TRANSPARENT_ALPHA) {
            continue;
        }

        const weight = alpha / 255;
        const color = composite(
            { r: pixels[offset], g: pixels[offset + 1], b: pixels[offset + 2] },
            weight,
            background,
        );

        visibleWeight += weight;
        if (contrastRatio(color, background) < MIN_VISIBLE_CONTRAST) {
            blendingWeight += weight;
        }
    }

    if (seeThroughPixels / pixelCount < MIN_TRANSPARENT_SHARE) {
        return false;
    }

    if (visibleWeight === 0) {
        // Nothing is drawn at all; show the backdrop so the image area is not mistaken for empty space.
        return true;
    }

    return blendingWeight / visibleWeight >= MIN_BLENDING_SHARE;
}
