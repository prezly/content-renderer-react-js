'use client';

import type { ImageNode } from '@prezly/story-content-format';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes } from 'react';
import { useMemo, useState } from 'react';

import { Lightbox, Media, Rollover } from '../../components';
import { stringifyNode } from '../../lib';

import './Image.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: ImageNode;
    onDownload?: (image: UploadcareImage) => void;
    onPreviewOpen?: (image: UploadcareImage) => void;
    baseCdnUrl?: string;
}

function getContainerStyle(node: ImageNode): CSSProperties {
    if (node.layout !== 'contained') {
        return {};
    }

    const maxWidth = `${node.file.original_width}px`;
    const unit = node.width.slice(-1) === '%' ? '%' : 'px';

    if (unit === '%' && parseFloat(node.width).toFixed(2) === Number(100).toFixed(2)) {
        return { maxWidth };
    }

    return { width: node.width, maxWidth };
}

const NEW_TAB_ATTRIBUTES: Partial<AnchorHTMLAttributes<HTMLAnchorElement>> = {
    target: '_blank',
    rel: 'noopener noreferrer',
};

export function Image({
    children,
    className,
    node,
    onDownload,
    onPreviewOpen,
    baseCdnUrl,
    ...props
}: Props) {
    const { file, href, align, layout } = node;

    const isNewTab = node.new_tab ?? true;
    const title = stringifyNode(node).trim();
    const containerStyle = getContainerStyle(node);

    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const image = useMemo(
        () =>
            baseCdnUrl
                ? UploadcareImage.createFromPrezlyStoragePayload(file).withBaseCdnUrl(baseCdnUrl)
                : UploadcareImage.createFromPrezlyStoragePayload(file),
        [file, baseCdnUrl],
    );

    function handleRolloverClick() {
        setIsPreviewOpen(true);
    }
    function handleImagePreviewClose() {
        setIsPreviewOpen(false);
    }

    return (
        <figure
            className={classNames('prezly-slate-image', className, {
                'prezly-slate-image--contained': layout === 'contained',
                'prezly-slate-image--expanded': layout === 'expanded',
                'prezly-slate-image--full-width': layout === 'full-width',
                'prezly-slate-image--align-left': align === 'left',
                'prezly-slate-image--align-right': align === 'right',
            })}
            {...props}
        >
            {href && (
                <a
                    id={`image-${file.uuid}`}
                    href={href}
                    className="prezly-slate-image__link"
                    {...(isNewTab ? NEW_TAB_ATTRIBUTES : {})}
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image} />
                </a>
            )}

            {!href && (
                <Rollover
                    id={`image-${file.uuid}`}
                    disabled={image.isGif()}
                    href={image.preview().format().cdnUrl}
                    onClick={handleRolloverClick}
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image} />
                </Rollover>
            )}

            {title && <figcaption className="prezly-slate-image__caption">{children}</figcaption>}

            <Lightbox
                image={isPreviewOpen ? image : null}
                onClose={handleImagePreviewClose}
                onDownload={onDownload}
                onOpen={onPreviewOpen}
                title={title}
            >
                {children}
            </Lightbox>
        </figure>
    );
}
