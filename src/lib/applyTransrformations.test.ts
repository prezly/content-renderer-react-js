import { type Node, type ParagraphNode, Text } from '@prezly/story-content-format';

import { applyTransformations } from './applyTransformations';

function makeBold(node: Node): Node {
    if (Text.isText(node)) {
        return { ...node, bold: true } as Node;
    }
    return node;
}

function removeWorld(node: Node): Node | null {
    if (Text.isText(node) && node.text === 'world') {
        return null;
    }
    return node;
}

describe('applyTransformations', () => {
    it('should return exactly the same input if no transformations provided', () => {
        const input: ParagraphNode[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true },
                    { text: 'world', italic: true },
                ],
            },
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true }],
            },
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [])).toBe(input);
    });

    it('should return exactly the same input if no transformations applied', () => {
        const input: ParagraphNode[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true },
                    { text: 'world', italic: true },
                ],
            },
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true }],
            },
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [(node) => node])).toBe(input);
    });

    it('should run transformation for all nodes recursively', () => {
        const input: ParagraphNode = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true },
                { text: 'world', italic: true },
            ],
        };
        const expected: ParagraphNode = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true },
                { text: 'world', bold: true, italic: true },
            ],
        };

        Object.freeze(input);

        expect(applyTransformations(input, [makeBold])).toEqual(expected);
    });

    it('should apply transformations to a list of nodes recursively', () => {
        const input: ParagraphNode[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true },
                    { text: 'world', italic: true },
                ],
            },
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', underlined: true }],
            },
        ];
        const expected: ParagraphNode[] = [
            {
                type: 'paragraph',
                children: [
                    { text: 'hello', bold: true },
                    { text: 'world', bold: true, italic: true },
                ],
            },
            {
                type: 'paragraph',
                children: [{ text: 'this is Prezly', bold: true, underlined: true }],
            },
        ];

        Object.freeze(input);

        expect(applyTransformations(input, [makeBold])).toEqual(expected);
    });

    it('should remove node if transformation returned null', () => {
        const input: ParagraphNode = {
            type: 'paragraph',
            children: [
                { text: 'hello', bold: true },
                { text: 'world', italic: true },
            ],
        };
        const expected = {
            type: 'paragraph',
            children: [{ text: 'hello', bold: true }],
        };

        Object.freeze(input);

        expect(applyTransformations(input, [removeWorld])).toEqual(expected);
    });
});
