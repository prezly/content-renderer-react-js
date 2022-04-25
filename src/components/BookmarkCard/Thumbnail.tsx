import React from 'react';
import { Link } from '../';

interface ThumbnailProps {
    href: string;
    src: string;
    newTab: boolean;
    width?: number;
    height?: number;
}

export function Thumbnail({ newTab, href, src, width, height }: ThumbnailProps) {
    return (
        <Link
            href={href}
            className={'prezly-slate-bookmark-card-component__thumbnail'}
            style={{ backgroundImage: `url("${src}")` }}
            newTab={newTab}
        >
            <img
                className={'prezly-slate-bookmark-card-component__thumbnailImage'}
                src={src}
                width={width}
                height={height}
                alt="Website preview"
            />
        </Link>
    );
}
