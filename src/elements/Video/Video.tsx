import type { VideoNode } from '@prezly/story-content-format';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
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
                <HtmlInjection
                    id={`video-${node.uuid}`}
                    html={oembed.html}
                    onError={() => setHtmlEmbeddedWithErrors(true)}
                />
            ) : (
                <>
                    <Thumbnail
                        src={oembed.thumbnail_url}
                        width={oembed.thumbnail_width}
                        height={oembed.thumbnail_height}
                    />
                    <PlayButtonOverlay
                        id={`video-${node.uuid}`}
                        href={url}
                        title={node.oembed.title}
                    />
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
            <img className="prezly-slate-video__thumbnail-image" src={src} alt="Video thumbnail" />
        </div>
    );
};

const ThumbnailPlaceholder: FunctionComponent = () => (
    <div className="prezly-slate-video__thumbnail-placeholder" />
);

const PlayButtonOverlay: FunctionComponent<{ id?: string; href: string; title?: string }> = ({
    id,
    href,
    title,
}) => (
    <a
        id={id}
        className="prezly-slate-video__play-button-overlay"
        href={href}
        rel="noopener noreferer"
        target="blank"
        title={title}
    >
        <PlayButton className="prezly-slate-video__play-button-icon" />
    </a>
);
