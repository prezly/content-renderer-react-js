import { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

import './Paragraph.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    node: ParagraphNode;
}

export function Paragraph({ children, className, node, ...props }: Props) {
    return (
        <p
            className={classNames('prezly-slate-paragraph', className, {
                'prezly-slate-paragraph--align-inherit': node.align === undefined,
                'prezly-slate-paragraph--align-left': node.align === ParagraphNode.Alignment.LEFT,
                'prezly-slate-paragraph--align-center': node.align === ParagraphNode.Alignment.CENTER,
                'prezly-slate-paragraph--align-right': node.align === ParagraphNode.Alignment.RIGHT,
            })}
            {...props}
        >
            {children}
        </p>
    );
}
