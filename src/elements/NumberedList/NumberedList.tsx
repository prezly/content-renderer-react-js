import type { ListNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './NumberedList.scss';

interface Props extends HTMLAttributes<HTMLUListElement> {
    node: ListNode;
}

export const NumberedList: FunctionComponent<Props> = ({ children, className, ...props }) => (
    <ol className={classNames('prezly-slate-numbered-list', className)} {...props}>
        {children}
    </ol>
);
