import { EmbedNode, OEmbedInfoType } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Embed.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: EmbedNode;
    showAsScreenshot?: boolean;
}
const Embed: FunctionComponent<Props> = ({
    children,
    className,
    node,
    showAsScreenshot,
    ...props
}) => {
    const { oembed, url } = node;
    const title = oembed.title || url;

    return (
        <a
            className={classNames('prezly-slate-embed', className, {
                'prezly-slate-embed--link': oembed.type === OEmbedInfoType.LINK,
                'prezly-slate-embed--video': oembed.type === OEmbedInfoType.VIDEO,
            })}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            title={title}
            {...props}
        >
            {oembed.type === OEmbedInfoType.LINK && (
                <span className="prezly-slate-embed__link">{title}</span>
            )}

            {oembed.type !== OEmbedInfoType.LINK && (
                <img className="prezly-slate-embed__screenshot" src={oembed.screenshot_url} />
            )}
        </a>
    );
};

export default Embed;
