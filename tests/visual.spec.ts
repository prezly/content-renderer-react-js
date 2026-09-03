import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, type Page, test } from '@playwright/test';

/**
 * Stories tagged with this are rendered from third-party iframes (video and embed providers),
 * so their screenshots are not reproducible. Add the tag to a story's `tags` to opt it out.
 */
const SKIP_TAG = 'skip-visual-test';

interface StoryEntry {
    type: string;
    id: string;
    name: string;
    title: string;
    tags?: string[];
}

const indexPath = join(__dirname, '../storybook-static/index.json');

const EXTERNAL_IMAGE_DIMENSIONS: Record<string, [width: number, height: number]> = {
    'cb4879f8-d3ad-4a65-b74f-0afa09c913d5': [6000, 4000],
    'd0bdf122-a96a-425b-93e8-e3f1a052d413': [300, 300],
    '90a308d7-411c-459f-8772-f83de2dae1db': [1024, 2968],
    'da42f9f4-6bc2-4b42-8c8e-04a0d0db9aee': [1200, 1199],
    '52a78e73-cea4-43d5-91a3-fd9182160f5b': [3994, 1359],
    '9fba656c-9203-4e8a-8b69-e0a2e9e622e0': [1024, 2968],
    '4cc29f43-6cb6-4138-a832-f855cf7a403c': [300, 300],
    'dac5a11b-300f-459e-900a-8bb1ee64abae': [870, 260],
    '432bdfeb-a3b5-4c66-9979-c5f2411ba5f7': [1200, 1199],
};

function createExternalImage(url: string): Buffer {
    const [, dimensions = [1200, 800]] =
        Object.entries(EXTERNAL_IMAGE_DIMENSIONS).find(([uuid]) => url.includes(uuid)) ?? [];
    const [width, height] = dimensions;

    return Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
            viewBox="0 0 1200 800" preserveAspectRatio="none">
            <rect width="1200" height="800" fill="#e9eef5" />
            <path d="M0 800 420 320l220 240 160-160 400 400Z" fill="#8ba3bf" />
            <circle cx="900" cy="220" r="110" fill="#f0b35a" />
        </svg>
    `);
}

function readStories(): StoryEntry[] {
    let index: { entries: Record<string, StoryEntry> };

    try {
        index = JSON.parse(readFileSync(indexPath, 'utf8'));
    } catch {
        throw new Error(
            `Missing ${indexPath}. Run \`pnpm build-storybook\` before the visual tests.`,
        );
    }

    return Object.values(index.entries).filter(
        (entry) => entry.type === 'story' && !entry.tags?.includes(SKIP_TAG),
    );
}

function getGalleryLayout(page: Page): Promise<string> {
    return page.locator('.prezly-slate-gallery__images').evaluateAll((galleries) =>
        JSON.stringify(
            galleries.map((gallery) =>
                Array.from(gallery.children).map((row) =>
                    Array.from(row.children).map((image) => {
                        const bounds = image.getBoundingClientRect();

                        return {
                            style: image.getAttribute('style'),
                            width: bounds.width,
                            height: bounds.height,
                            source: image.querySelector('img, video')?.getAttribute('src'),
                        };
                    }),
                ),
            ),
        ),
    );
}

for (const story of readStories()) {
    test(`${story.title} — ${story.name}`, async ({ page, baseURL }) => {
        // A stale or partial Storybook build serves 404s for its chunks and renders
        // Storybook's error screen — which would otherwise be captured as a baseline.
        const brokenAssets: string[] = [];

        page.on('response', (response) => {
            if (response.url().startsWith(String(baseURL)) && response.status() >= 400) {
                brokenAssets.push(`${response.status()} ${response.url()}`);
            }
        });

        const storybookOrigin = new URL(String(baseURL)).origin;

        await page.route(/^https?:\/\//, async (route) => {
            const request = route.request();

            if (
                request.resourceType() !== 'image' ||
                new URL(request.url()).origin === storybookOrigin
            ) {
                await route.continue();
                return;
            }

            await route.fulfill({
                status: 200,
                contentType: 'image/svg+xml',
                headers: { 'access-control-allow-origin': '*' },
                body: createExternalImage(request.url()),
            });
        });

        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

        // Some stories render nothing on purpose, so wait for the root to be attached
        // rather than visible. `toHaveScreenshot` then waits for the pixels to settle.
        await page.waitForSelector('#storybook-root', { state: 'attached' });

        // Bookmark, gallery and image stories load their artwork from external CDNs, and the
        // components only insert the <img> tags once they have measured themselves. Settle the
        // network first — otherwise the images-complete check below passes against an empty
        // list and the screenshot captures placeholder boxes at the wrong page height.
        await page.waitForLoadState('networkidle').catch(() => {});

        // The gallery lays out against `DEFAULT_GALLERY_WIDTH_SSR` (720/840/1280px) until its
        // ResizeObserver delivers the real width. Nudge the observed element itself, then wait
        // for React to apply both measurements so the real layout always wins. Resizing the
        // emulated viewport here makes mobile screenshots race against browser viewport updates.
        const initialGalleryLayout = await getGalleryLayout(page);

        if (initialGalleryLayout !== '[]') {
            await page.locator('.prezly-slate-gallery__images').evaluateAll((galleries) => {
                for (const gallery of galleries) {
                    const element = gallery as HTMLElement;
                    element.style.width = `${element.getBoundingClientRect().width - 1}px`;
                }
            });
            await expect.poll(() => getGalleryLayout(page)).not.toBe(initialGalleryLayout);

            const nudgedGalleryLayout = await getGalleryLayout(page);
            await page.locator('.prezly-slate-gallery__images').evaluateAll((galleries) => {
                for (const gallery of galleries) {
                    (gallery as HTMLElement).style.removeProperty('width');
                }
            });
            await expect.poll(() => getGalleryLayout(page)).not.toBe(nudgedGalleryLayout);

            let previousLayout = '';
            let stableMeasurements = 0;

            await expect
                .poll(
                    async () => {
                        const layout = await getGalleryLayout(page);

                        stableMeasurements = layout === previousLayout ? stableMeasurements + 1 : 0;
                        previousLayout = layout;

                        return stableMeasurements;
                    },
                    { intervals: [250], timeout: 15_000 },
                )
                .toBeGreaterThanOrEqual(4);
        }

        // A full-page screenshot scrolls the viewport, which triggers lazy-loaded images.
        // Walk the final layout so every image URL produced by the resize above has loaded.
        await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
                window.scrollTo(0, y);
                await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
            }
            window.scrollTo(0, 0);
        });

        await page.waitForLoadState('networkidle').catch(() => {});

        await page.waitForFunction(
            () =>
                Array.from(document.images).every(
                    (image) => image.complete && image.naturalWidth > 0,
                ),
            null,
            { timeout: 20_000 },
        );

        await page.evaluate(() => document.fonts.ready);

        expect(brokenAssets, 'Storybook failed to serve its own assets').toEqual([]);

        await expect(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true });
    });
}
