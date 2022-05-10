import type { HtmlNode } from '@prezly/story-content-format';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: HtmlNode;
}

export function Html({ node, ...props }: Props) {
    return <div {...props} dangerouslySetInnerHTML={{ __html: node.content }} />;
}
