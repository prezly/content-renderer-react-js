import { TextNode } from '@prezly/slate-types';

import { Node } from '../types';

/**
 * TODO: Add `isTextNode()` to `@prezly/slate-types` and use it instead of this one.
 */
export function isTextNode(node: Node): node is TextNode {
    return 'text' in node;
}
