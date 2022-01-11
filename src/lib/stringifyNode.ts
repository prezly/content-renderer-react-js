import { Node } from 'slate';

export function stringifyNode(node: Node): string {
    return Node.string(node);
}
