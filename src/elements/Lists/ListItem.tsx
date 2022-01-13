import type { ListItemNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './ListItem.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    node: ListItemNode;
}

export const ListItem: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <li className={classNames('prezly-slate-list-item', className)} {...props}>
        {children}
    </li>
);