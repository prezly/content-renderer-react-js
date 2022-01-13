import type { HeadingNode } from '@prezly/slate-types';
import { HEADING_1_NODE_TYPE } from '@prezly/slate-types';
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
            })}
            {...props}
        >
            {children}
        </Tag>
    );
};
