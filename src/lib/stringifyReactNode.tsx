import React, { ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server.js';
import striptags from 'striptags';

export function stringifyReactNode(node?: ReactNode): string {
    return striptags(ReactDOMServer.renderToStaticMarkup(<>{node}</>));
}
