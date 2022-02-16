import React, { HTMLAttributes } from 'react';
import type { HtmlNode } from '@prezly/slate-types';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: HtmlNode;
}

export function Html({ node, ...props }: Props) {
    return <div {...props} dangerouslySetInnerHTML={{ __html: node.content }} />;
}
