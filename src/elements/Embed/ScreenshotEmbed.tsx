import type { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, ImgHTMLAttributes } from 'react';

import './ScreenshotEmbed.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    children?: never;
    node: EmbedNode;
}

export const ScreenshotEmbed: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const { oembed } = node;

    return (
        <img
            alt={oembed.title}
            className={classNames('prezly-slate-screenshot-embed', className)}
            src={oembed.screenshot_url}
            {...props}
        />
    );
};
