import type { Node } from 'slate';

export type Transformation = (node: Node) => Node | null;
