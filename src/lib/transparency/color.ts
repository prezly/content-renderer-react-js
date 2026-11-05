export interface Rgb {
    r: number;
    g: number;
    b: number;
}

function channelLuminance(value: number): number {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/**
 * WCAG relative luminance of an sRGB colour.
 */
export function relativeLuminance({ r, g, b }: Rgb): number {
    return (
        0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
    );
}

/**
 * WCAG contrast ratio between two colours (1 to 21).
 */
export function contrastRatio(first: Rgb, second: Rgb): number {
    const a = relativeLuminance(first);
    const b = relativeLuminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/**
 * Parse a computed CSS colour (`rgb()`/`rgba()`, as returned by `getComputedStyle`).
 * Returns `null` for anything else, so callers can treat the colour as unknown.
 */
export function parseCssColor(value: string): (Rgb & { a: number }) | null {
    const normalized = value.trim().toLowerCase();
    // Browsers report an unset background as `rgba(0, 0, 0, 0)`; some DOM implementations as ''.
    if (normalized === 'transparent' || normalized === '') {
        return { r: 0, g: 0, b: 0, a: 0 };
    }

    const match = normalized.match(/^rgba?\(([^)]+)\)$/);
    if (!match) {
        return null;
    }

    const parts = match[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) {
        return null;
    }

    const [r, g, b] = parts.slice(0, 3).map(Number);
    const alphaPart = parts[3];
    const a =
        alphaPart === undefined
            ? 1
            : alphaPart.endsWith('%')
              ? Number(alphaPart.slice(0, -1)) / 100
              : Number(alphaPart);

    if ([r, g, b, a].some((component) => Number.isNaN(component))) {
        return null;
    }

    return { r, g, b, a };
}

/**
 * Composite `top` (with `alpha`) over an opaque `bottom` colour.
 */
export function composite(top: Rgb, alpha: number, bottom: Rgb): Rgb {
    return {
        r: top.r * alpha + bottom.r * (1 - alpha),
        g: top.g * alpha + bottom.g * (1 - alpha),
        b: top.b * alpha + bottom.b * (1 - alpha),
    };
}
