import type { HeadingNode } from '@prezly/slate-types';
import { Alignment, HEADING_1_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Heading.scss';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    node: HeadingNode;
}

export const Heading: FunctionComponent<Props> = ({ children, className, node, ...props }) => {
    const Tag = node.type === HEADING_1_NODE_TYPE ? 'h1' : 'h2';
    return (
        <Tag
            className={classNames('prezly-slate-heading', className, {
                'prezly-slate-heading--heading-1': Tag === 'h1',
                'prezly-slate-heading--heading-2': Tag === 'h2',
                'prezly-slate-heading--align-inherit': node.align === undefined,
                'prezly-slate-heading--align-left': node.align === Alignment.LEFT,
                'prezly-slate-heading--align-center': node.align === Alignment.CENTER,
                'prezly-slate-heading--align-right': node.align === Alignment.RIGHT,
            })}
            {...props}
        >
            {children}
        </Tag>
    );
};
