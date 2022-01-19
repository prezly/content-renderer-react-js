import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, HTMLAttributes, useMemo, useState } from 'react';

import { Lightbox, Media, Rollover } from '../../components';

import './Image.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: ImageNode;
    onDownload?: (image: UploadcareImage) => void;
    onPreviewOpen?: (image: UploadcareImage) => void;
}

const getContainerStyle = (node: ImageNode): CSSProperties => {
    if (node.layout !== 'contained') {
        return {};
    }

    const width = `${((parseFloat(node.width) * parseFloat(node.width_factor)) / 100).toFixed(2)}%`;

    if (width === `${(100).toFixed(2)}%`) {
        return {};
    }

    return { width };
};

export const Image: FunctionComponent<Props> = ({
    children,
    className,
    node,
    onDownload,
    onPreviewOpen,
    ...props
}) => {
    const { file, href, layout } = node;
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const image = useMemo(() => UploadcareImage.createFromPrezlyStoragePayload(file), [file.uuid]);
    const containerStyle = getContainerStyle(node);
    const handleRolloverClick = () => setIsPreviewOpen(true);
    const handleImagePreviewClose = () => setIsPreviewOpen(false);

    return (
        <figure
            className={classNames('prezly-slate-image', className, {
                'prezly-slate-image--contained': layout === 'contained',
                'prezly-slate-image--expanded': layout === 'expanded',
                'prezly-slate-image--full-width': layout === 'full-width',
                'prezly-slate-image--gif': image.isGif(),
            })}
            {...props}
        >
            {href && (
                <a
                    href={href}
                    className="prezly-slate-image__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image}>
                        {children}
                    </Media>
                </a>
            )}

            {!href && (
                <Rollover
                    disabled={image.isGif()}
                    onClick={handleRolloverClick}
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image}>
                        {children}
                    </Media>
                </Rollover>
            )}

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>

            <Lightbox
                image={isPreviewOpen ? image : null}
                onClose={handleImagePreviewClose}
                onDownload={onDownload}
                onOpen={onPreviewOpen}
            >
                {children}
            </Lightbox>
        </figure>
    );
};
