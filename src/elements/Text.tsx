import type { Text as TextNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

const LINE_BREAKS = /\r\n|\r|\n/;
const ZERO_WIDTH_WHITE_SPACE = '\u200B';

interface Props {
    node: TextNode;
}

export function Text({ node }: Props) {
    const { bold, italic, subscript, superscript, text, underlined, highlighted } = node;
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

    if (highlighted) {
        children = <mark>{children}</mark>;
    }

    return <>{children}</>;
}

Text.preserveSoftBreaks = (text: string): ReactNode => {
    const nodes = text.split(LINE_BREAKS).reduce<ReactNode[]>(
        (result, part, index) =>
            result.length === 0
                ? [part]
                : [
                      ...result,
                      <Fragment key={index}>
                          <br />
                          {ZERO_WIDTH_WHITE_SPACE}
                      </Fragment>,
                      part,
                  ],
        [],
    );

    return <>{nodes}</>;
};
