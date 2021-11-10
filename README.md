# Prezly Content Renderer for React.js

Render [Prezly Content Format][prezly-content-format] documents used at [Prezly][prezly].

![Version](https://img.shields.io/npm/v/@prezly/content-renderer-react-js)
![License](https://img.shields.io/npm/l/@prezly/content-renderer-react-js)

## Setup

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
import { DOCUMENT_NODE_TYPE, HEADING_1_NODE_TYPE, DocumentNode } from '@prezly/slate-types';
import { Renderer } from '@prezly/slate-renderer';

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

const MyComponent = () => (
    <Renderer
        nodes={documentNode} /* or nodes={[documentNode]}, up to you */
        options={{
            /* override default heading render */
            [HEADING_1_NODE_TYPE]: ({ children, className, node, ...props }) => (
                <div className={className} style={{ color: 'red' }}>
                    {children}
                </div>
            ),
        }}
    />
);

export default MyComponent;
```

----

Brought to you by [Prezly][prezly].


[prezly]: https://www.prezly.com/?utm_source=github&utm_campaign=@prezly/content-renderer-react-js
[prezly-content-format]: https://developers.prezly.com/docs/api/ZG9jOjU2NjAyNTY-prezly-content-format
