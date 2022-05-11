import { type Node, ComposedElement } from '@prezly/story-content-format';

import type { Transformation } from '../types';

export function applyTransformations<T extends Node>(node: T, transformations: Transformation[]): T | null;
export function applyTransformations<T extends Node>(node: T[], transformations: Transformation[]): T[];
export function applyTransformations(input: Node | Node[], transformations: Transformation[]): Node[] | Node | null {
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

    if (ComposedElement.isComposedElement(input)) {
        let element = input;

        // Transform children first
        const children = applyTransformations(input.children as Node[], transformations);

        if (children !== input.children) {
            // Create a new node object only if there's a change
            element = { ...input, children } as ComposedElement;
        }

        return applyTransformationsWithoutRecursion(element, transformations);
    }

    return applyTransformationsWithoutRecursion(input, transformations);
}

function applyTransformationsWithoutRecursion(node: Node, transformations: Transformation[]): Node | null {
    return transformations.reduce<Node | null>((result, transform) => (result ? transform(result) : null), node);
}
