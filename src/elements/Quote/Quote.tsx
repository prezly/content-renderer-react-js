import type { QuoteNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Quote.scss';

interface Props extends HTMLAttributes<HTMLQuoteElement> {
    node: QuoteNode;
}

export const Quote: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <blockquote
        className={classNames('prezly-slate-quote', className, {
            'prezly-slate-quote--align-inherit': node.align === undefined,
            'prezly-slate-quote--align-left': node.align === Alignment.LEFT,
            'prezly-slate-quote--align-center': node.align === Alignment.CENTER,
            'prezly-slate-quote--align-right': node.align === Alignment.RIGHT,
        })}
        {...props}
    >
        {children}
    </blockquote>
);
