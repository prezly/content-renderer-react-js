import React, { ReactNode } from 'react';

import type { TextRenderer } from './types';

const LINE_BREAKS = /\r\n|\r|\n/;

export const DefaultTextRenderer: TextRenderer = ({
    bold,
    italic,
    subscript,
    superscript,
    text,
    underlined,
}) => {
    let children: ReactNode = preserveSoftBreaks(text);

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
};


function preserveSoftBreaks(text: string): ReactNode {
    const nodes = text.split(LINE_BREAKS).reduce<ReactNode[]>(function (result, part) {
        return result.length === 0 ? [part] : [...result, <br />, part];
    }, []);

    return <>{nodes}</>;
}
