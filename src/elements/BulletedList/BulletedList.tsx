import type { ListNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './BulletedList.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    node: ListNode;
}

export const BulletedList: FunctionComponent<Props> = ({ children, className, ...props }) => (
    <ul className={classNames('prezly-slate-bulleted-list', className)} {...props}>
        {children}
    </ul>
);
