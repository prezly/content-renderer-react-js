import { isTextNode } from '@prezly/slate-types';
import type { Node } from 'slate';

const ZERO_WIDTH_WHITE_SPACE = '\u200B';

export function preventWhitespaceCollapsing(node: Node): Node {
    if (isTextNode(node)) {
        const text = node.text.replace(/(\s)(?=\s)/g, `$1${ZERO_WIDTH_WHITE_SPACE}`);
        return { ...node, text };
    }

    return node;
}
