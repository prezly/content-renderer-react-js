import React, { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import striptags from 'striptags';

export function stringifyReactNode(node?: ReactNode): string {
    return striptags(renderToStaticMarkup(<>{node}</>));
}
