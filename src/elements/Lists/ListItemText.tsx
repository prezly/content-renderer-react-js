import type { ListItemTextNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

import './ListItemText.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: ListItemTextNode;
}

export function ListItemText({ children, className, node, ...props }: Props) {
    return (
        <span className={classNames('prezly-slate-list-item-text', className)} {...props}>
            {children}
        </span>
    );
}
