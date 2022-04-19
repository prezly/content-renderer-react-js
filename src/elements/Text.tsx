import type { TextNode } from '@prezly/slate-types';
import React, { ReactNode } from 'react';

const LINE_BREAKS = /\r\n|\r|\n/;

interface Props {
    node: TextNode;
}

export function Text({ node }: Props) {
    const { bold, italic, subscript, superscript, text, underlined } = node;
    let children: ReactNode = Text.preserveSoftBreaks(text);

    if (bold) {
        children = <strong>{children}</strong>;
    }

    if (italic) {
        children = <em>{children}</em>;
    }

    if (subscript) {
        children = <sub>{children}</sub>;
    }

    if (superscript) {
        children = <sup>{children}</sup>;
    }

    if (underlined) {
        children = <u>{children}</u>;
    }

    return <>{children}</>;
}

Text.preserveSoftBreaks = function (text: string): ReactNode {
    const nodes = text.split(LINE_BREAKS).reduce<ReactNode[]>(function (result, part) {
        return result.length === 0 ? [part] : [...result, <br />, part];
    }, []);

    return <>{nodes}</>;
};
