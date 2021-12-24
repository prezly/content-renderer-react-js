import { BookmarkNode } from '@prezly/slate-types';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './Bookmark.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    node: BookmarkNode;
}

export const Bookmark: FunctionComponent<Props> = ({ className }) => {
    return (
        // TODO: Implement renderer
        <div className={classNames('prezly-slate-bookmark', className)} />
    );
};
