import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import './Bookmark.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    node: BookmarkNode;
}

function hostname(url: string): string {
    const { host } = new URL(url);
    return host;
}

function homepage(url: string): string {
    const { origin } = new URL(url);
    return origin;
}

function isEmptyText(text: string | null | undefined): boolean {
    return !(text && text.replace(/\s+/g, ''));
}

const Thumbnail: FunctionComponent<{
    href: string;
    src: string;
    width?: number;
    height?: number;
}> = ({ href, src, width, height }) => (
    <a
        href={href}
        className="prezly-slate-bookmark__thumbnail"
        style={{ backgroundImage: `url("${src}")` }}
    >
        <img
            className="prezly-slate-bookmark__thumbnail-image"
            src={src}
            width={width}
            height={height}
            alt="Website preview"
        />
    </a>
);

const Provider: FunctionComponent<{
    id?: string;
    oembed: BookmarkNode['oembed'];
    showUrl: boolean;
}> = ({ oembed, showUrl, id }) => {
    const { url } = oembed;
    const favicon = `https://avatars-cdn.prezly.com/favicon?url=${url}?ideal_height=32`;
    const providerUrl = showUrl ? url : homepage(oembed.provider_url || url);
    const provider = showUrl ? url : oembed.provider_name || hostname(oembed.provider_url || url);

    return (
        <a
            id={id}
            className="prezly-slate-bookmark__provider"
            rel="noopener noreferrer"
            target="_blank"
            href={providerUrl}
        >
            <img
                className="prezly-slate-bookmark__provider-icon"
                src={favicon}
                alt={`${provider} favicon`}
                aria-hidden="true"
            />
            <span className="prezly-slate-bookmark__provider-name">{provider}</span>
        </a>
    );
};

export const Bookmark: FunctionComponent<Props> = ({ node, className, ...attributes }) => {
    const { url, oembed, layout, uuid } = node;
    const showThumbnail = node.show_thumbnail && oembed.thumbnail_url;
    const isEmpty = !showThumbnail && isEmptyText(oembed.title) && isEmptyText(oembed.description);
    const actualLayout = showThumbnail ? layout : BookmarkCardLayout.HORIZONTAL;
    const id = `bookmark-${uuid}`;

    return (
        <div
            {...attributes}
            className={classNames('prezly-slate-bookmark', {
                'prezly-slate-bookmark--minimal': isEmpty,
                'prezly-slate-bookmark--vertical': actualLayout === BookmarkCardLayout.VERTICAL,
                'prezly-slate-bookmark--horizontal': actualLayout === BookmarkCardLayout.HORIZONTAL,
            })}
        >
            {showThumbnail && oembed.thumbnail_url && (
                <Thumbnail
                    href={url}
                    src={oembed.thumbnail_url}
                    width={oembed.thumbnail_width}
                    height={oembed.thumbnail_height}
                />
            )}
            <div className="prezly-slate-bookmark__details">
                {!isEmptyText(oembed.title) && (
                    <a
                        id={id}
                        className="prezly-slate-bookmark__title"
                        href={url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {oembed.title}
                    </a>
                )}
                {!isEmptyText(oembed.description) && (
                    <div className="prezly-slate-bookmark__description">{oembed.description}</div>
                )}
                <Provider
                    oembed={oembed}
                    showUrl={isEmpty}
                    id={isEmptyText(oembed.title) ? id : undefined}
                />
            </div>
        </div>
    );
};
