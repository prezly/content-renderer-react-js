import type { ListItemTextNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './ListItemText.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: ListItemTextNode;
}

export const ListItemText: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <span className={classNames('prezly-slate-list-item-text', className)} {...props}>
        {children}
    </span>
);
