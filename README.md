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
