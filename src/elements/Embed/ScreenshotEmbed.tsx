import type { EmbedNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { ImgHTMLAttributes } from 'react';

import './ScreenshotEmbed.scss';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
    node: EmbedNode;
}

export function ScreenshotEmbed({ className, node, ...props }: Props) {
    const { oembed } = node;

    return (
        <img
            alt={oembed.title}
            className={classNames('prezly-slate-screenshot-embed', className)}
            src={oembed.screenshot_url}
            {...props}
        />
    );
}
