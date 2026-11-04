import { contrastRatio, parseCssColor } from './color';
import { needsTransparencyBackdrop } from './needsTransparencyBackdrop';

type Rgba = [number, number, number, number];

const WHITE = { r: 255, g: 255, b: 255 };
const DARK = { r: 17, g: 24, b: 39 };

const TRANSPARENT: Rgba = [0, 0, 0, 0];
const WHITE_INK: Rgba = [255, 255, 255, 255];
const BLACK_INK: Rgba = [0, 0, 0, 255];
const BLUE_INK: Rgba = [37, 99, 235, 255];

/** Build an RGBA buffer from `[pixel, count]` runs. */
function pixels(...runs: Array<[Rgba, number]>): Uint8ClampedArray {
    return Uint8ClampedArray.from(
        runs.flatMap(([pixel, count]) => Array(count).fill(pixel).flat()),
    );
}

describe('needsTransparencyBackdrop', () => {
    it('shows the backdrop for white artwork on a white background', () => {
        expect(needsTransparencyBackdrop(pixels([WHITE_INK, 30], [TRANSPARENT, 70]), WHITE)).toBe(
            true,
        );
    });

    it('does not show it for white artwork on a dark background', () => {
        expect(needsTransparencyBackdrop(pixels([WHITE_INK, 30], [TRANSPARENT, 70]), DARK)).toBe(
            false,
        );
    });

    it('does not show it for dark artwork on a white background', () => {
        expect(needsTransparencyBackdrop(pixels([BLACK_INK, 30], [TRANSPARENT, 70]), WHITE)).toBe(
            false,
        );
    });

    it('shows it for dark artwork on a dark background', () => {
        expect(needsTransparencyBackdrop(pixels([BLACK_INK, 30], [TRANSPARENT, 70]), DARK)).toBe(
            true,
        );
    });

    it('never shows it for opaque images, even when they match the background', () => {
        expect(needsTransparencyBackdrop(pixels([WHITE_INK, 100]), WHITE)).toBe(false);
        expect(needsTransparencyBackdrop(pixels([WHITE_INK, 97], [TRANSPARENT, 3]), WHITE)).toBe(
            false,
        );
    });

    it('shows it when most of a mixed logo would disappear', () => {
        expect(
            needsTransparencyBackdrop(
                pixels([WHITE_INK, 24], [BLUE_INK, 16], [TRANSPARENT, 60]),
                WHITE,
            ),
        ).toBe(true);
    });

    it('does not show it when most of a mixed logo stays visible', () => {
        expect(
            needsTransparencyBackdrop(
                pixels([WHITE_INK, 10], [BLUE_INK, 30], [TRANSPARENT, 60]),
                WHITE,
            ),
        ).toBe(false);
    });

    it('treats faint semi-transparent ink as blending in', () => {
        const faintBlack: Rgba = [0, 0, 0, 10];
        expect(needsTransparencyBackdrop(pixels([faintBlack, 40], [TRANSPARENT, 60]), WHITE)).toBe(
            true,
        );
    });

    it('shows it for a fully transparent image and not for an empty sample', () => {
        expect(needsTransparencyBackdrop(pixels([TRANSPARENT, 10]), WHITE)).toBe(true);
        expect(needsTransparencyBackdrop(new Uint8ClampedArray(), WHITE)).toBe(false);
    });

    it('treats very light grey on white as blending in, but mid grey as visible', () => {
        const lightGrey: Rgba = [240, 240, 240, 255];
        const midGrey: Rgba = [200, 200, 200, 255];
        expect(needsTransparencyBackdrop(pixels([lightGrey, 30], [TRANSPARENT, 70]), WHITE)).toBe(
            true,
        );
        expect(needsTransparencyBackdrop(pixels([midGrey, 30], [TRANSPARENT, 70]), WHITE)).toBe(
            false,
        );
    });
});

describe('color helpers', () => {
    it('computes WCAG contrast ratios', () => {
        expect(contrastRatio(WHITE, WHITE)).toBe(1);
        expect(contrastRatio({ r: 0, g: 0, b: 0 }, WHITE)).toBeCloseTo(21);
    });

    it('parses computed colours', () => {
        expect(parseCssColor('rgb(255, 255, 255)')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
        expect(parseCssColor('rgba(0, 0, 0, 0)')).toEqual({ r: 0, g: 0, b: 0, a: 0 });
        expect(parseCssColor('rgb(10 20 30 / 50%)')).toEqual({ r: 10, g: 20, b: 30, a: 0.5 });
        expect(parseCssColor('transparent')).toEqual({ r: 0, g: 0, b: 0, a: 0 });
        expect(parseCssColor('oklch(0.5 0.1 200)')).toBeNull();
    });
});
