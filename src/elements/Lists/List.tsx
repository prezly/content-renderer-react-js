import type { ListNode } from '@prezly/slate-types';
import { BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './List.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    node: ListNode;
}

export const List: FunctionComponent<Props> = ({ node, children, className, ...props }) => {
    const Tag = node.type === NUMBERED_LIST_NODE_TYPE ? 'ol' : 'ul';
    return (
        <Tag
            className={classNames(className, 'prezly-slate-list', {
                'prezly-slate-list--bulleted': node.type === BULLETED_LIST_NODE_TYPE,
                'prezly-slate-list--numbered': node.type === NUMBERED_LIST_NODE_TYPE,
            })}
            {...props}
        >
            {children}
        </Tag>
    );
};
