import type {ParagraphNode, TextNode} from '@prezly/slate-types';
import { isTextNode } from '@prezly/slate-types';
import type { Node } from 'slate';

import { applyTransformations } from './applyTransformations';

function makeBold(node: Node): Node {
    if (isTextNode(node)) {
        return { ...node, bold: true } as Node;
    }
    return node;
}

function removeWorld(node: Node): Node | null {
    if (isTextNode(node) && node.text === 'world') {
        return null;
    }
    return node;
}

describe('applyTransformations', () => {
    it('should return exactly the same input if no transformations provided', () => {
        const input: Node[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true } as TextNode,
                    { text: 'world', italic: true } as TextNode,
                ],
            } as ParagraphNode as Node,
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true } as TextNode],
            } as ParagraphNode as Node,
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [])).toBe(input);
    });

    it('should return exactly the same input if no transformations applied', () => {
        const input: Node[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true } as TextNode,
                    { text: 'world', italic: true } as TextNode,
                ],
            } as ParagraphNode as Node,
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true } as TextNode],
            } as ParagraphNode as Node,
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [(node) => node])).toBe(input);
    });

    it('should run transformation for all nodes recursively', () => {
        const input: Node = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true } as TextNode,
                { text: 'world', italic: true } as TextNode,
            ],
        } as ParagraphNode as Node;
        const expected = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true } as TextNode,
                { text: 'world', bold: true, italic: true } as TextNode,
            ],
        };

        Object.freeze(input);

        expect(applyTransformations(input, [makeBold])).toEqual(expected);
    });

    it('should apply transformations to a list of nodes recursively', () => {
        const input: Node[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true } as TextNode,
                    { text: 'world', italic: true } as TextNode,
                ],
            } as ParagraphNode as Node,
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true } as TextNode],
            } as ParagraphNode as Node,
        ];
        const expected = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true } as TextNode,
                    { text: 'world', bold: true, italic: true } as TextNode,
                ],
            },
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', bold: true, underlined: true } as TextNode],
            },
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [makeBold])).toEqual(expected);
    });

    it('should remove node if transformation returned null', () => {
        const input: Node = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true } as TextNode,
                { text: 'world', italic: true } as TextNode,
            ],
        } as ParagraphNode as Node;
        const expected = {
            type: 'paragraph',
            children: [{ text: 'hello', bold: true }],
        };

        Object.freeze(input);

        expect(applyTransformations(input, [removeWorld])).toEqual(expected);
    });
});
