# Prezly Content Renderer for React.js

Render [Prezly Content Format][prezly-content-format] documents used at [Prezly][prezly].

![Version](https://img.shields.io/npm/v/@prezly/content-renderer-react-js)
![License](https://img.shields.io/npm/l/@prezly/content-renderer-react-js)

## Installation

### pnpm

```Shell
pnpm add @prezly/content-renderer-react-js
```

#### peerDependencies

Make sure all peer dependencies are met (`react`, `react-dom`).

```Shell
pnpm add react react-dom
pnpm add --save-dev @types/react @types/react-dom
```

### object-fit-images polyfill

If you need to support older browsers, you can use this polyfill for `object-fit`: https://github.com/fregante/object-fit-images. This package already includes necessary syntax to work with the polyfill - all you have to do is include the polyfill.

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.min.js"></script>
<script>
    objectFitImages();
</script>
```

## Usage

```tsx
import { DocumentNode, HeadingNode } from '@prezly/story-content-format';
import { Renderer, Component } from '@prezly/slate-renderer';

const documentNode: DocumentNode = {
    type: DocumentNode.TYPE,
    version: '0.50',
    children: [
        {
            type: HeadingNode.Type.HEADING_ONE,
            children: [{ text: 'Hello world!' }],
        },
    ],
};

export function Content() {
    return <Renderer nodes={documentNode} />;
}

// You can also override default renders by
// declaring custom renderers as children `<Component>` elements
export function ContentWithCustomHeadings() {
    return (
        <Renderer nodes={documentNode}>
            <Component
                match={isHeadingNode}
                component={({ children, node }) => <div style={{ color: 'red' }}>{children}</div>}
            />
        </Renderer>
    );
}
```

# Development

There is a sandbox app in this repository with Hot Module Replacement.
It will automatically include updates of any code changes you make locally.
To start it, simply run `pnpm start`:

```shell
pnpm install
pnpm start
```

## Visual regression tests

Visual regression tests use Playwright against a static Storybook build. Docker keeps local
screenshots consistent with CI.

```shell
pnpm test:visual
```

Regenerate the committed snapshots after an intentional visual change:

```shell
pnpm test:visual:update
```

Failed CI runs upload the Playwright report and image diffs in the `playwright-report` artifact.

---

Brought to you by [Prezly][prezly].

[prezly]: https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/content-renderer-react-js
[prezly-content-format]: https://developers.prezly.com/docs/api/ZG9jOjU2NjAyNTY-prezly-content-format

### Transparent gallery previews

Gallery thumbnails and lightbox images show a neutral CSS checkerboard behind
transparent pixels **only when the image would otherwise blend into the colour behind
it** (for example white artwork on a white page). Other images render unchanged.

The check runs in the browser once an image nears the viewport:

1. JPEGs and GIFs are skipped; only formats that can carry transparency are checked.
2. A 64px PNG sample of the image is read from the CDN through a canvas.
3. The colour behind the image is resolved from the ancestors' computed
   `background-color`. If an ancestor paints a background image or gradient, or the
   sample cannot be read, the checkerboard is shown.
4. The checkerboard is shown when at least 5% of the image is see-through and at least
   50% of its visible (alpha-weighted) pixels have a contrast ratio below 1.25:1
   against that colour.

When needed, the `prezly-slate-media--transparency-backdrop` class is added to the
image. Image URLs and original downloads are unchanged, and results are cached per
image and background colour.

Themes can apply the same check to their own images with `useTransparencyBackdrop`:

```tsx
const ref = useRef<HTMLImageElement>(null);
const needsBackdrop = useTransparencyBackdrop(uploadcareImage, ref);
```

The pure `needsTransparencyBackdrop(pixels, background)` and `getBackgroundBehind(element)`
helpers are exported as well.


## Publishing releases

Releases use the manually dispatched [Publish Content Renderer workflow](https://github.com/prezly/content-renderer-react-js/actions/workflows/publish.yml).
Local publishing through np is retired. Keep account 2FA enabled: CI authenticates with npm trusted publishing (OIDC), without a personal npm token or an interactive OTP.

### One-time setup

1. Create the GitHub environment **`npm`** in `prezly/content-renderer-react-js`. Restrict deployment branches to **`master`**, and configure required reviewers if available. The workflow also restricts execution to that branch.
2. Merge `.github/workflows/publish.yml` through a reviewed PR before configuring npm. The workflow uses GitHub-hosted runners, Node 24, npm 11.15.0 (OIDC requires at least 11.5.1), and `id-token: write`. No `NPM_TOKEN` or `NODE_AUTH_TOKEN` secret is required.
3. On npm, open each package's Settings → Trusted Publisher → GitHub Actions. Use organization **`prezly`**, repository **`content-renderer-react-js`**, workflow filename **`publish.yml`** (filename only), and environment **`npm`**. Enable **Allow npm publish**. Leave **Allow npm dist-tag** disabled; this workflow sets the tag when publishing and does not retag existing versions.
4. Configure `@prezly/content-renderer-react-js`. Preserve unrelated existing trusted publishers. Create connections close to the approved first release: npm currently requires the first successful publish within two days, otherwise the connection expires and must be recreated.

See [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/). The SDK workflow's permissions alone do not prove that its separate npm connection works.

### Prepare reviewed versions

Update the root `package.json` version in a PR.
Update the lockfile if the manifest changes require it, and include release notes in the PR. Do not use local release scripts to bump, commit, tag or push versions.
Versions are never changed by CI. A new release needs unpublished committed versions. `latest` rejects prerelease versions; use `next` for reviewed prereleases. Both channels publish only from `master`.

### Validate and publish

1. Merge the reviewed version and workflow changes into `master`.
2. Open Actions → Publish Content Renderer → Run workflow. Select `master`, choose `latest` or `next`, and leave **dry_run=true**.
3. Inspect all checks, the job summary, and the `npm-release-<commit>-<attempt>` artifact. Compatibility checks run in separate jobs, so their dependency overrides cannot affect release tarballs. The release job builds with the frozen lockfile, runs lint, type checks and tests, packs using `pnpm pack`, checks packed manifests and entry points, and installs the tarballs in a fresh consumer directory with CommonJS and ESM smoke tests. It rejects source changes made by build scripts.
4. A dry run validates all tarballs and reports existing versions without overwriting them. It runs `npm publish --dry-run` only for unpublished versions, because npm rejects existing versions even in dry-run mode. **Dry runs do not prove OIDC publishing authentication works.** If a version already exists with different bytes or a different channel tag, a real release will stop before publishing any package. Prepare a reviewed version bump first.
5. Obtain explicit release approval for the commit, versions and channel. Dispatch again with **dry_run=false** and the same channel, checking that the default-branch commit is the one approved. Approve the environment deployment if required. The real run repeats all checks and publishes the validated tarballs using `npm publish`.
6. The workflow verifies registry integrity and tags, then installs exact published versions in a fresh directory and checks CommonJS and ESM imports. Check this step before announcing success. No Git tag or GitHub Release is created automatically.

One repository-wide concurrency group serializes both channels and retries, with `cancel-in-progress: false`. Do not cancel an active publish or run a separate publisher alongside it. GitHub may replace older pending runs; select the intended commit before dispatching again.

### Recovery

A publish may succeed even if the workflow later fails during registry or consumer verification.

1. Read the failing run's summary and retain its artifact, commit SHA and channel. Inspect registry versions before retrying; a network failure does not mean publishing failed.
2. Fix the npm trusted publisher mapping or environment setup if authentication failed. A connection must exactly match this repository, `publish.yml`, and `npm`. Do not add a personal token as a workaround.
3. Rerun **all jobs of the same workflow run**, keeping its original commit and channel. Previously published versions are skipped only when their SHA-512 integrity and selected dist-tag exactly match the rebuilt tarballs. All packages are preflighted before any publication. The remaining packages publish in dependency order. The registry verification step also checks skipped packages.
4. If rebuilt bytes differ, stop. Do not unpublish, overwrite, or bypass the comparison. Compare the retained artifact with the rebuild to diagnose the difference. Prepare a new reviewed version bump and release it normally. Keep consumers on the previous complete release until the new set passes registry installation checks.
5. A different existing dist-tag also stops recovery. Retagging or promoting an existing `next` version needs a separately approved process and is not performed by this workflow.

For local checks after building, use `node .github/scripts/release.mjs pack latest` and `node .github/scripts/release.mjs dry-run latest`. These use no publishing credentials. Real publication is guarded to run only in the manual default-branch GitHub workflow. Artifacts are written to ignored `.release/`; npm installs use a temporary directory outside the workspace. Run `node --test .github/scripts/release-checks.mjs` to test release safeguards without contacting npm or publishing.
