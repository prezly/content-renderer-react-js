import type { Rgb } from './color';
import { composite, parseCssColor } from './color';

const CANVAS_DEFAULT: Rgb = { r: 255, g: 255, b: 255 };

/**
 * Resolve the solid colour painted behind `element` by compositing its ancestors'
 * background colours. Returns `null` when the backdrop cannot be determined reliably,
 * e.g. an ancestor paints a background image or gradient.
 */
export function getBackgroundBehind(element: Element): Rgb | null {
    const layers: Array<Rgb & { a: number }> = [];
    let current = element.parentElement;

    while (current) {
        const style = window.getComputedStyle(current);
        if (style.backgroundImage && style.backgroundImage !== 'none') {
            return null;
        }

        const color = parseCssColor(style.backgroundColor);
        if (!color) {
            return null;
        }

        if (color.a > 0) {
            layers.push(color);
        }
        if (color.a >= 1) {
            break;
        }

        current = current.parentElement;
    }

    return layers.reduceRight<Rgb>(
        (behind, layer) => composite(layer, layer.a, behind),
        CANVAS_DEFAULT,
    );
}

/**
 * Load a (small) CORS-enabled image and return its RGBA pixels.
 */
export function loadImagePixels(url: string): Promise<Uint8ClampedArray> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.decoding = 'async';
        image.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                const context = canvas.getContext('2d', { willReadFrequently: true });
                if (!context || canvas.width === 0 || canvas.height === 0) {
                    reject(new Error('Unable to read image pixels'));
                    return;
                }
                context.drawImage(image, 0, 0);
                resolve(context.getImageData(0, 0, canvas.width, canvas.height).data);
            } catch (error) {
                reject(error);
            }
        };
        image.onerror = () => reject(new Error(`Unable to load ${url}`));
        image.src = url;
    });
}
