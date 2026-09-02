import { defineConfig, devices } from '@playwright/test';

const PORT = 6007;
const BASE_URL = `http://127.0.0.1:${PORT}`;

/**
 * Visual regression testing against the static Storybook build.
 * Run `pnpm build-storybook` first, or use `pnpm test:visual` which does it for you.
 */
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

    timeout: 90_000,

    expect: {
        // Image-heavy stories need more than the 5s default to settle.
        timeout: 20_000,
        toHaveScreenshot: {
            // Anti-aliasing and font hinting differ slightly between runs.
            maxDiffPixelRatio: 0.01,
            animations: 'disabled',
        },
    },

    use: {
        baseURL: BASE_URL,
        // Stories pull images from the Prezly CDN — keep failures out of the screenshots.
        ignoreHTTPSErrors: true,
    },

    // Mirrors the viewports the previous Loki setup covered.
    projects: [
        {
            name: 'laptop',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
        },
        {
            name: 'narrow',
            use: { ...devices['Desktop Chrome'], viewport: { width: 479, height: 768 } },
        },
        {
            // Loki emulated an iPhone 7 through Chrome, so stay on Chromium rather than
            // picking up WebKit from the device preset.
            name: 'iphone',
            use: { ...devices['iPhone 7'], browserName: 'chromium' },
        },
    ],

    webServer: {
        command: `pnpm exec http-server storybook-static --port ${PORT} --silent`,
        url: `${BASE_URL}/iframe.html`,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
    },
});
