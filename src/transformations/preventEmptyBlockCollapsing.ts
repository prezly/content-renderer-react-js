import type { Node } from '@prezly/slate-types';
import { isElementNode, isTextNode } from '@prezly/slate-types';

function isEmpty(node: Node): boolean {
    if (isTextNode(node)) {
        return node.text.length === 0;
    }

    if (isElementNode(node)) {
        return node.children.every((node) => isEmpty(node as Node));
    }

    return false;
}

export function preventEmptyBlockCollapsing(node: Node): Node {
    if (isElementNode(node) && isEmpty(node)) {
        return {
            ...node,
            children: [...node.children, { text: '\u00a0' }],
        };
    }

    return node;
}
