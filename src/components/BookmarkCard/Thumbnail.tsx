import React from 'react';

interface ThumbnailProps {
    href: string;
    src: string;
    width?: number;
    height?: number;
}

export function Thumbnail({ href, src, width, height }: ThumbnailProps) {
    return (
        <a
            href={href}
            className={'prezly-slate-bookmark-card-component__thumbnail'}
            style={{ backgroundImage: `url("${src}")` }}
        >
            <img
                className={'prezly-slate-bookmark-card-component__thumbnailImage'}
                src={src}
                width={width}
                height={height}
                alt="Website preview"
            />
        </a>
    );
}
