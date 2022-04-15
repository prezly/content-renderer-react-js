import type { TextNode } from '@prezly/slate-types';
import React, { ReactNode } from 'react';
import { replaceAllWith } from '../../lib';

const LINE_BREAKS = /\r\n|\r|\n/;
const SPACE = / /;

export function Text({ bold, italic, subscript, superscript, text, underlined }: TextNode) {
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
    const nodes = replaceAllWith(
        text,
        [
            SPACE,
            <>
                <span style={{ whiteSpace: 'pre-wrap' }}> </span>
            </>,
        ],
        [
            LINE_BREAKS,
            <>
                <br />
                <span style={{ display: 'inline-block', overflow: 'hidden', width: 0 }}>{''}</span>
            </>,
        ],
    );

    return <>{nodes}</>;
};
