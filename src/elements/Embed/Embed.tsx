import type { EmbedNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Embed.scss';
import { Iframe } from './Iframe';
import { LinkEmbed } from './LinkEmbed';
import { ScreenshotEmbed } from './ScreenshotEmbed';

interface Props extends HTMLAttributes<HTMLElement> {
    children?: never;
    node: EmbedNode;
    showAsScreenshot?: boolean;
}

export const Embed: FunctionComponent<Props> = ({
    className,
    node,
    showAsScreenshot,
    ...props
}) => {
    const { oembed, url } = node;

    const commonProps = {
        id: `embed-${node.uuid}`,
        className: classNames('prezly-slate-embed', className),
        title: oembed.title || url,
        ...props,
    };

    if (oembed.type === 'link') {
        return <LinkEmbed {...commonProps} node={node} />;
    }

    return (
        <div {...commonProps}>
            {showAsScreenshot ? (
                <ScreenshotEmbed className="prezly-slate-embed__screenshot" node={node} />
            ) : (
                <Iframe html={node.oembed.html || ''} />
            )}
        </div>
    );
};
