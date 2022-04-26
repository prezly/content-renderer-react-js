import { isTextNode } from '@prezly/slate-types';
import type { Node } from 'slate';

export function preventWhitespaceCollapsing(node: Node): Node {
    if (isTextNode(node)) {
        const text = node.text.replace(/(\s)(?=\s)/g, '$1\u200B');
        return { ...node, text };
    }

    return node;
}
