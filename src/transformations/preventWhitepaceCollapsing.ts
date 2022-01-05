import { isTextNode, Node } from '@prezly/slate-types';

export function preventWhitespaceCollapsing(node: Node): Node {
    if (isTextNode(node)) {
        const text = node.text.replace(/\s\s/g, ' \u00A0');
        return { ...node, text };
    }

    return node;
}
