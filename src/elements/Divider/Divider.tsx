import type { DividerNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import './Divider.scss';

interface Props extends Omit<HTMLAttributes<HTMLHRElement>, 'children'> {
    node: DividerNode;
}

export function Divider({ className }: Props) {
    return <hr className={classNames('prezly-slate-divider', className)} />;
}
