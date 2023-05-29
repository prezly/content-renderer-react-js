import type { VideoNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';

import { HtmlInjection } from '../../components';
import { PlayButton } from '../../icons';

import './Video.scss';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    node: VideoNode;
}

export function Video({ className, node }: Props) {
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
}

interface ThumbnailProps {
    src?: string;
    width?: number;
    height?: number;
}

function Thumbnail({ src, width, height }: ThumbnailProps) {
    if (!src) {
        return <ThumbnailPlaceholder />;
    }

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;
    return (
        <div className="prezly-slate-video__thumbnail" style={{ paddingBottom }}>
            <img className="prezly-slate-video__thumbnail-image" src={src} alt="Video thumbnail" />
        </div>
    );
}

function ThumbnailPlaceholder() {
    return <div className="prezly-slate-video__thumbnail-placeholder" />;
}

interface PlayButtonOverlayProps {
    id?: string;
    href: string;
    title?: string;
}

function PlayButtonOverlay({ id, href, title }: PlayButtonOverlayProps) {
    return (
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
}
