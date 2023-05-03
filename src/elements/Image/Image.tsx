import type { ImageNode } from '@prezly/story-content-format';
import { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, {
    AnchorHTMLAttributes,
    CSSProperties,
    HTMLAttributes,
    useMemo,
    useState,
} from 'react';

import { Lightbox, Media, Rollover } from '../../components';
import { stringifyNode } from '../../lib';

import './Image.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: ImageNode;
    onDownload?: (image: UploadcareImage) => void;
    onPreviewOpen?: (image: UploadcareImage) => void;
}

function getContainerStyle(node: ImageNode): CSSProperties {
    if (node.layout !== 'contained') {
        return {};
    }

    const width = `${parseFloat(node.width).toFixed(2)}%`;

    if (width === `${(100).toFixed(2)}%`) {
        return {};
    }

    return { width };
}

const NEW_TAB_ATTRIBUTES: Partial<AnchorHTMLAttributes<HTMLAnchorElement>> = {
    target: '_blank',
    rel: 'noopener noreferrer',
};

export function Image({ children, className, node, onDownload, onPreviewOpen, ...props }: Props) {
    const { file, href, align, layout } = node;
    const isNewTab = node.new_tab ?? true;
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const image = useMemo(() => UploadcareImage.createFromPrezlyStoragePayload(file), [file.uuid]);
    const containerStyle = getContainerStyle(node);
    const handleRolloverClick = () => setIsPreviewOpen(true);
    const handleImagePreviewClose = () => setIsPreviewOpen(false);
    const title = stringifyNode(node);

    return (
        <figure
            className={classNames('prezly-slate-image', className, {
                'prezly-slate-image--contained': layout === 'contained',
                'prezly-slate-image--expanded': layout === 'expanded',
                'prezly-slate-image--full-width': layout === 'full-width',
                'prezly-slate-image--align-left': align === 'left',
                'prezly-slate-image--align-right': align === 'right',
                'prezly-slate-image--gif': image.isGif(),
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
                    <Media className="prezly-slate-image__media" image={image} title={title} />
                </a>
            )}

            {!href && (
                <Rollover
                    id={`image-${file.uuid}`}
                    disabled={image.isGif()}
                    href={image.cdnUrl}
                    onClick={handleRolloverClick}
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image} title={title} />
                </Rollover>
            )}

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>

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
