import { type Node, Text } from '@prezly/story-content-format';

const ZERO_WIDTH_WHITE_SPACE = '\u200B';

export function preventWhitespaceCollapsing<T extends Node>(node: T): T {
    if (Text.isText(node)) {
        const text = node.text.replace(/(\s)(?=\s)/g, `$1${ZERO_WIDTH_WHITE_SPACE}`);
        return { ...node, text };
    }

    return node;
}
