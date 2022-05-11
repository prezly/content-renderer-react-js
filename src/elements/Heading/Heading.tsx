import { HeadingNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

import './Heading.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    node: HeadingNode;
}

export function Heading({ children, className, node, ...props }: Props) {
    const Tag = node.type === HeadingNode.Type.HEADING_ONE ? 'h1' : 'h2';
    return (
        <Tag
            className={classNames('prezly-slate-heading', className, {
                'prezly-slate-heading--heading-1': Tag === 'h1',
                'prezly-slate-heading--heading-2': Tag === 'h2',
                'prezly-slate-heading--align-inherit': node.align === undefined,
                'prezly-slate-heading--align-left': node.align === HeadingNode.Alignment.LEFT,
                'prezly-slate-heading--align-center': node.align === HeadingNode.Alignment.CENTER,
                'prezly-slate-heading--align-right': node.align === HeadingNode.Alignment.RIGHT,
            })}
            {...props}
        >
            {children}
        </Tag>
    );
}
