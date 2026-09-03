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
