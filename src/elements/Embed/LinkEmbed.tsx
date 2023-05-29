import type { EmbedNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { AnchorHTMLAttributes } from 'react';

import './LinkEmbed.scss';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
    node: EmbedNode;
}

export function LinkEmbed({ className, node, ...props }: Props) {
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
}
