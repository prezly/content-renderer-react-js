import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

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

/**
 * Fallback for bookmark provider icons. avatars-cdn redirects to whatever icon the linked site
 * advertises, and those redirects go stale — washingtonpost.com now blocks every static icon
 * path, which would bake a broken-image glyph into the baselines. Icons that still resolve are
 * passed through untouched; only genuinely dead ones fall back to this placeholder.
 */
const PROVIDER_ICON = readFileSync(join(__dirname, 'fixtures/provider-icon.png'));

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

        await page.route(/avatars-cdn\.prezly\.com\/favicon/, async (route) => {
            try {
                // Capped, because a dead redirect target hangs until the connection times out.
                const response = await route.fetch({ timeout: 5_000 });

                if (response.ok()) {
                    await route.fulfill({ response });
                    return;
                }
            } catch {
                // The icon the service redirects to is unreachable — fall back below.
            }

            await route.fulfill({ contentType: 'image/png', body: PROVIDER_ICON });
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

        // A full-page screenshot scrolls the viewport, which is what triggers lazy-loaded
        // gallery images. Walk the page first so they are already settled by capture time.
        await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
                window.scrollTo(0, y);
                await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
            }
            window.scrollTo(0, 0);
        });

        await page.waitForLoadState('networkidle').catch(() => {});

        await page
            .waitForFunction(
                () => Array.from(document.images).every((image) => image.complete),
                null,
                { timeout: 20_000 },
            )
            .catch(() => {
                // A single unreachable third-party asset shouldn't fail the whole story.
            });

        await page.evaluate(() => document.fonts.ready);

        // The gallery lays out against `DEFAULT_GALLERY_WIDTH_SSR` (720/840/1280px) until its
        // ResizeObserver delivers the real width, so it has two stable layouts and which one
        // you get is a race. Nudge the viewport now that everything is mounted and observed,
        // which guarantees the observer fires and the measured layout wins.
        const viewport = page.viewportSize();

        if (viewport) {
            await page.setViewportSize({ ...viewport, width: viewport.width - 1 });
            await page.setViewportSize(viewport);
        }

        // The reflow above is asynchronous, so wait until the page height stops moving.
        await page
            .waitForFunction(
                () => {
                    const store = window as unknown as { __lastHeight?: number };
                    const height = document.documentElement.scrollHeight;
                    const settled = store.__lastHeight === height;

                    store.__lastHeight = height;

                    return settled;
                },
                null,
                { polling: 250, timeout: 15_000 },
            )
            .catch(() => {});

        expect(brokenAssets, 'Storybook failed to serve its own assets').toEqual([]);

        await expect(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true });
    });
}
