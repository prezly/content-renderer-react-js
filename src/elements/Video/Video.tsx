import { VideoNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useState } from 'react';

import { HtmlInjection } from '../../components';
import { PlayButton } from '../../icons';

import './Video.scss';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    node: VideoNode;
}

function getContainerStyle(node: VideoNode): CSSProperties {
    const { thumbnail_height: height, thumbnail_width: width } = node.oembed;

    const paddingBottom = width && height ? `${Math.round((100 * height) / width)}%` : undefined;

    if (node.layout !== 'contained') {
        return { paddingBottom };
    }

    return { width: node.oembed.thumbnail_width, paddingBottom };
}

export function Video({ className, node }: Props) {
    const { oembed, url, layout } = node;
    const [isHtmlEmbeddedWithErrors, setHtmlEmbeddedWithErrors] = useState<boolean>(false);

    const containerStyle = getContainerStyle(node);

    return (
        <div className={classNames('prezly-slate-video', className)}>
            {!isHtmlEmbeddedWithErrors && oembed.html ? (
                <HtmlInjection
                    className={classNames('prezly-slate-video__html', {
                        'prezly-slate-video__html--expanded': layout === VideoNode.Layout.EXPANDED,
                        'prezly-slate-video__html--full-width':
                            layout === VideoNode.Layout.FULL_WIDTH,
                    })}
                    id={`video-${node.uuid}`}
                    html={oembed.html}
                    onError={() => setHtmlEmbeddedWithErrors(true)}
                    style={containerStyle}
                />
            ) : (
                <>
                    <Thumbnail node={node} />
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
    node: VideoNode;
}

function Thumbnail({ node }: ThumbnailProps) {
    const { layout, oembed } = node;
    const { url: src } = oembed;

    const containerStyle = getContainerStyle(node);

    if (!src) {
        return (
            <ThumbnailPlaceholder
                className={classNames({
                    'prezly-slate-video__thumbnail-placeholder--expanded':
                        layout === VideoNode.Layout.EXPANDED,
                    'prezly-slate-video__thumbnail-placeholder--full-width':
                        layout === VideoNode.Layout.FULL_WIDTH,
                })}
                style={containerStyle}
            />
        );
    }

    return (
        <div
            className={classNames('prezly-slate-video__thumbnail', {
                'prezly-slate-video__thumbnail--expanded': layout === VideoNode.Layout.EXPANDED,
                'prezly-slate-video__thumbnail--full-width': layout === VideoNode.Layout.FULL_WIDTH,
            })}
            style={containerStyle}
        >
            <img className="prezly-slate-video__thumbnail-image" src={src} alt="Video thumbnail" />
        </div>
    );
}

interface ThumbnailPlaceholderProps {
    className?: string;
    style?: CSSProperties;
}

function ThumbnailPlaceholder({ className, style }: ThumbnailPlaceholderProps) {
    return (
        <div
            className={classNames('prezly-slate-video__thumbnail-placeholder', className)}
            style={style}
        />
    );
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
