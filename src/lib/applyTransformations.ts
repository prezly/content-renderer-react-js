import type { Node } from 'slate';

import type { Transformation } from '../types';
import { isElementNode } from '@prezly/slate-types';

function applyTransformationsWithoutRecursion(
    node: Node,
    transformations: Transformation[],
): Node | null {
    return transformations.reduce<Node | null>(
        (result, transform) => (result ? transform(result) : null),
        node,
    );
}

export function applyTransformations(node: Node, transformations: Transformation[]): Node | null;
export function applyTransformations(nodes: Node[], transformations: Transformation[]): Node[];
export function applyTransformations(
    input: Node | Node[],
    transformations: Transformation[],
): Node[] | Node | null {
    if (transformations.length === 0) {
        return input;
    }

    if (Array.isArray(input)) {
        const nodes = input
            .map((node) => applyTransformations(node, transformations))
            .filter((node): node is Node => Boolean(node));

        if (nodes.length === input.length && nodes.every((node, index) => input[index] === node)) {
            // No changes => return exactly the same input array
            return input;
        }

        return nodes;
    }

    if (isElementNode(input)) {
        let element = input;

        // Transform children first
        const children: Node[] = applyTransformations(input.children as Node[], transformations);

        if (children !== input.children) {
            // Create a new node object only if there's a change
            element = { ...input, children };
        }

        return applyTransformationsWithoutRecursion(element, transformations);
    }

    return applyTransformationsWithoutRecursion(input as Node, transformations);
}
