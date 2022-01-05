import type { VideoNode } from '@prezly/slate-types';
import React, {FunctionComponent, HTMLAttributes, useState} from 'react';
import classNames from 'classnames';

import { HtmlInjection } from '../../components';
import { PlayButton } from '../../icons';

import './Video.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    node: VideoNode;
}

export const Video: FunctionComponent<Props> = ({ className, node }) => {
    const { oembed, url } = node;
    const [isHtmlEmbeddedWithErrors, setHtmlEmbeddedWithErrors] = useState<boolean>(false);

    return (
        <div className={classNames('prezly-slate-video', className)}>
            {!isHtmlEmbeddedWithErrors && oembed.html ? (
                <HtmlInjection html={oembed.html} onError={() => setHtmlEmbeddedWithErrors(true)} />
            ) : (
                <>
                    <Thumbnail
                        src={oembed.thumbnail_url}
                        width={oembed.thumbnail_width}
                        height={oembed.thumbnail_height}
                    />
                    <PlayButtonOverlay href={url} />
                </>
            )}
        </div>
    );
};

const Thumbnail: FunctionComponent<{ src?: string; width?: number; height?: number }> = ({
    src,
    width,
    height,
}) => {
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;
    return (
        <div className="prezly-slate-video__thumbnail" style={{ paddingBottom }}>
            <img
                className="prezly-slate-video__thumbnail-image"
                src={src}
                alt="Video thumbnail"
            />
        </div>
    );
};

const ThumbnailPlaceholder: FunctionComponent = () => (
    <div className="prezly-slate-video__thumbnail-placeholder" />
);

const PlayButtonOverlay: FunctionComponent<{ href: string }> = ({ href }) => (
    <a className="prezly-slate-video__play-button-overlay" href={href} rel="noopener noreferer" target="blank">
        <PlayButton className="prezly-slate-video__play-button-icon" />
    </a>
);
