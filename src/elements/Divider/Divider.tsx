import type { DividerNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Divider.scss';

interface Props extends HTMLAttributes<HTMLHRElement> {
    children?: never;
    node: DividerNode;
}

export const Divider: FunctionComponent<Props> = ({ className }) => (
    <hr className={classNames('prezly-slate-divider', className)} />
);
