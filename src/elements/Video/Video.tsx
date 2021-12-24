import { VideoNode } from '@prezly/slate-types';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './Video.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: never;
    node: VideoNode;
}

export const Video: FunctionComponent<Props> = ({ className }) => {
    return (
        // TODO: Implement renderer
        <div className={classNames('prezly-slate-video', className)} />
    );
};
