import { QuoteNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';

import './Quote.scss';

interface Props extends HTMLAttributes<HTMLQuoteElement> {
    node: QuoteNode;
}

export function Quote({ children, className, node, ...props }: Props) {
    return (
        <blockquote
            className={classNames('prezly-slate-quote', className, {
                'prezly-slate-quote--align-inherit': node.align === undefined,
                'prezly-slate-quote--align-left': node.align === QuoteNode.Alignment.LEFT,
                'prezly-slate-quote--align-center': node.align === QuoteNode.Alignment.CENTER,
                'prezly-slate-quote--align-right': node.align === QuoteNode.Alignment.RIGHT,
            })}
            {...props}
        >
            {children}
        </blockquote>
    );
}
