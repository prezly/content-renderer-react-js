import type { Node } from '@prezly/story-content-format';

export type Transformation = (node: Node) => Node | null;
