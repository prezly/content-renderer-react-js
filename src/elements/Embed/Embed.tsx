import type { EmbedNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import './Embed.scss';
import { Iframe } from './Iframe';
import { LinkEmbed } from './LinkEmbed';
import { ScreenshotEmbed } from './ScreenshotEmbed';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    node: EmbedNode;
    showAsScreenshot?: boolean;
}

export function Embed({ className, node, showAsScreenshot, ...props }: Props) {
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
}
