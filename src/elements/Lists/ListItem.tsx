import type { ListItemNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import './ListItem.scss';

interface Props extends HTMLAttributes<HTMLLIElement> {
    node: ListItemNode;
}

export function ListItem({ children, className, node, ...props }: Props) {
    return (
        <li className={classNames('prezly-slate-list-item', className)} {...props}>
            {children}
        </li>
    );
}
