# Prezly Content Renderer for React.js

Render [Prezly Content Format][prezly-content-format] documents used at [Prezly][prezly].

![Version](https://img.shields.io/npm/v/@prezly/content-renderer-react-js)
![License](https://img.shields.io/npm/l/@prezly/content-renderer-react-js)

## Installation

### npm

```Shell
npm install --save @prezly/content-renderer-react-js
```

#### peerDependencies

Make sure all peer dependencies are met (`react`, `react-dom`).

```Shell
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom
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
import React from 'react';
import {
    DOCUMENT_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    DocumentNode,
    isHeadingNode,
} from '@prezly/slate-types';
import { Renderer, Component } from '@prezly/slate-renderer';

const documentNode: DocumentNode = {
    children: [
        {
            children: [{ text: 'Hello world!' }],
            type: HEADING_1_NODE_TYPE,
        },
    ],
    type: DOCUMENT_NODE_TYPE,
    version: '0.50',
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
To start it, simply run `npm run start`:

```shell
npm install
npm run start
```

## Loki

We use [Loki](https://loki.js.org/) visual testing library for storybook.
There are several commands that you can use:

1. `loki` - checks that your current stories are matched what you already have (Storybook server should run)
1. `loki:update` - Regenerate all snapshots despite what you already have (Storybook server should run)
1. `loki:static-build` - Performs checks like `loki` does, but over builded sources from storybook, no need to run Storybook server

---

Brought to you by [Prezly][prezly].

[prezly]: https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/content-renderer-react-js
[prezly-content-format]: https://developers.prezly.com/docs/api/ZG9jOjU2NjAyNTY-prezly-content-format
