import type { GalleryNode, UploadcareImage } from '@prezly/slate-types';
import { useMeasure } from '@react-hookz/web';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';

import { Lightbox } from '../../components';

import {
    DEFAULT_GALLERY_WIDTH_SSR,
    DEFAULT_MAX_VIEWPORT_WIDTH,
    IMAGE_PADDING,
    IMAGE_SIZE,
} from './constants';
import './Gallery.scss';
import { GalleryImage } from './GalleryImage';
import { calculateLayout, prepareImages, useGallery } from './lib';

interface Props extends HTMLAttributes<HTMLElement> {
    children?: never;
    node: GalleryNode;
    maxViewportWidth?: number;
    onImageDownload?: (image: UploadcareImage) => void;
    onPreviewOpen?: (image: UploadcareImage) => void;
}

export const Gallery: FunctionComponent<Props> = ({
    className,
    maxViewportWidth = DEFAULT_MAX_VIEWPORT_WIDTH,
    node,
    onImageDownload,
    onPreviewOpen,
    ...props
}) => {
    const [rect, ref] = useMeasure<HTMLDivElement>();
    const width = rect?.width || DEFAULT_GALLERY_WIDTH_SSR;
    const margin = IMAGE_PADDING[node.padding];
    const idealHeight = IMAGE_SIZE[node.thumbnail_size] + 2 * margin;
    const images = useMemo(() => prepareImages(node, maxViewportWidth), [node]);
    const calculatedLayout = calculateLayout({ idealHeight, images, viewportWidth: width });
    const [{ image, isNextEnabled, isPreviousEnabled }, { onClose, onNext, onOpen, onPrevious }] =
        useGallery(images);

    return (
        <figure
            id={`gallery-${node.uuid}`}
            className={classNames('prezly-slate-gallery', className, {
                'prezly-slate-gallery--contained': node.layout === 'contained',
                'prezly-slate-gallery--expanded': node.layout === 'expanded',
                'prezly-slate-gallery--full-width': node.layout === 'full-width',
            })}
            {...props}
        >
            <div className="prezly-slate-gallery__images" ref={ref} style={{ margin: -margin }}>
                {calculatedLayout.map((row, index) => (
                    <div className="prezly-slate-gallery__row" key={index}>
                        {row.map(({ height, image, width }) => (
                            <GalleryImage
                                height={height}
                                image={image}
                                key={image.uuid}
                                margin={margin}
                                onClick={onOpen}
                                width={width}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <Lightbox
                image={image}
                isNextEnabled={isNextEnabled}
                isPreviousEnabled={isPreviousEnabled}
                onClose={onClose}
                onDownload={onImageDownload}
                onNext={onNext}
                onOpen={onPreviewOpen}
                onPrevious={onPrevious}
            >
                {image?.caption}
            </Lightbox>
        </figure>
    );
};
