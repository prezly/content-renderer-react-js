import type { HtmlNode } from '@prezly/story-content-format';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: HtmlNode;
}

export function Html({ node, ...props }: Props) {
    return <div {...props} dangerouslySetInnerHTML={{ __html: node.content }} />;
}
