import type { ParagraphNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Paragraph.scss';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    node: ParagraphNode;
}

export const Paragraph: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <p
        className={classNames('prezly-slate-paragraph', className, {
            'prezly-slate-paragraph--align-inherit': node.align === undefined,
            'prezly-slate-paragraph--align-left': node.align === Alignment.LEFT,
            'prezly-slate-paragraph--align-center': node.align === Alignment.CENTER,
            'prezly-slate-paragraph--align-right': node.align === Alignment.RIGHT,
        })}
        {...props}
    >
        {children}
    </p>
);
