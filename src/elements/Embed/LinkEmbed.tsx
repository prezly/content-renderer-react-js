import type { EmbedNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './LinkEmbed.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: never;
    node: EmbedNode;
}

export const LinkEmbed: FunctionComponent<Props> = ({ className, node, ...props }) => {
    const { oembed, url } = node;

    return (
        <a
            className={classNames('prezly-slate-link-embed', className)}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            {...props}
        >
            {oembed.title && <span className="prezly-slate-link-embed__title">{oembed.title}</span>}

            <span className="prezly-slate-link-embed__url">{url}</span>
        </a>
    );
};
