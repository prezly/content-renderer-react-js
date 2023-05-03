import { ComposedElement, type Node, Text } from '@prezly/story-content-format';

function isEmpty(node: Node): boolean {
    if (Text.isText(node)) {
        return node.text.length === 0;
    }

    if (ComposedElement.isComposedElement(node)) {
        return (node.children as Node[]).every(isEmpty);
    }

    return false;
}

export function preventEmptyBlockCollapsing<T extends Node>(node: T): T {
    if (ComposedElement.isComposedElement(node) && isEmpty(node)) {
        return {
            ...node,
            children: [...node.children, { text: '\u00a0' }],
        };
    }

    return node;
}
