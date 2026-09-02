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
    test(`${story.title} — ${story.name}`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

        // Some stories render nothing on purpose, so wait for the root to be attached
        // rather than visible. `toHaveScreenshot` then waits for the pixels to settle.
        await page.waitForSelector('#storybook-root', { state: 'attached' });
        await page.evaluate(() => document.fonts.ready);

        await expect(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true });
    });
}
