import { ComposedElement, Node, Text } from '@prezly/story-content-format';

export function stringifyNode(node: Node): string {
    if (Text.isText(node)) {
        return node.text;
    }
    if (ComposedElement.isComposedElement(node)) {
        return node.children.map(stringifyNode).join('');
    }
    return '';
}
