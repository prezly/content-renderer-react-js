import { CalloutNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import { stringifyNode } from '../../lib';

import './Callout.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: CalloutNode;
}

export function Callout({ children, className, node, ...props }: Props) {
    const isEmpty = stringifyNode(node).trim() === '';

    if (isEmpty) {
        return null;
    }

    return (
        <div
            className={classNames('prezly-slate-callout', className, {
                'prezly-slate-callout--align-inherit': node.align === undefined,
                'prezly-slate-callout--align-left': node.align === CalloutNode.Alignment.LEFT,
                'prezly-slate-callout--align-center': node.align === CalloutNode.Alignment.CENTER,
                'prezly-slate-callout--align-right': node.align === CalloutNode.Alignment.RIGHT,
            })}
            data-icon={node.icon || undefined}
            {...props}
        >
            <p>{children}</p>
        </div>
    );
}
