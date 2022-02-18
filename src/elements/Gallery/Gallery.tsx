import type { GalleryNode, UploadcareImage } from '@prezly/slate-types';
import { useMeasure } from '@react-hookz/web';
import classNames from 'classnames';
import React, { HTMLAttributes, useMemo } from 'react';

import { Lightbox } from '../../components';

import {
    DEFAULT_GALLERY_WIDTH_SSR,
    DEFAULT_MAX_VIEWPORT_WIDTH,
    IMAGE_PADDING,
    IMAGE_SIZE,
} from './constants';
import './Gallery.scss';
import { GalleryImage } from './GalleryImage';
import { calculateLayout, extractImages, useGallery } from './lib';

interface Props extends HTMLAttributes<HTMLElement> {
    node: GalleryNode;
    maxViewportWidth?: number;
    onImageDownload?: (image: UploadcareImage) => void;
    onPreviewOpen?: (image: UploadcareImage) => void;
}

interface Tile {
    index: number;
    width: number;
    height: number;
}

export function Gallery({
    className,
    maxViewportWidth = DEFAULT_MAX_VIEWPORT_WIDTH,
    node,
    onImageDownload,
    onPreviewOpen,
    ...props
}: Props) {
    const [rect, ref] = useMeasure<HTMLDivElement>();
    const width = rect?.width || DEFAULT_GALLERY_WIDTH_SSR[node.layout];
    const margin = IMAGE_PADDING[node.padding];
    const idealHeight = IMAGE_SIZE[node.thumbnail_size] + 2 * margin;
    const originalImages = useMemo(() => extractImages(node), [node]);
    const calculatedLayout = calculateLayout({
        idealHeight,
        images: originalImages,
        viewportWidth: width,
    });
    const previewImages = calculatedLayout.flatMap((row) =>
        row.map(({ index, width, height }) =>
            originalImages[index].preview(ceil(width * 2, 500), ceil(height * 2, 500)),
        ),
    );
    const [{ image, isNextEnabled, isPreviousEnabled }, { onClose, onNext, onOpen, onPrevious }] =
        useGallery(originalImages);

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
                {calculatedLayout.map((tiles, index) => (
                    <Row
                        key={index}
                        originalImages={originalImages}
                        previewImages={previewImages}
                        tiles={tiles}
                        margin={margin}
                        onClick={onOpen}
                    />
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
}

function Row(props: {
    originalImages: UploadcareImage[];
    previewImages: UploadcareImage[];
    tiles: Tile[];
    margin: number;
    onClick: (image: UploadcareImage) => void;
}) {
    const { originalImages, previewImages, tiles, margin, onClick } = props;

    if (tiles.length === 0) {
        return null;
    }

    const tilesWidth = tiles.map(({ width }) => width).reduce((sum, width) => sum + width, 0);

    return (
        <div className="prezly-slate-gallery__row">
            {tiles.map(({ height, index, width }) => (
                <GalleryImage
                    key={originalImages[index].uuid}
                    originalImage={originalImages[index]}
                    previewImage={previewImages[index]}
                    onClick={onClick}
                    rounded={margin > 0}
                    style={{
                        flexBasis: `${(100 * width) / tilesWidth}%`,
                        width: `${(100 * width) / tilesWidth}%`,
                        height: `${(100 * height) / tilesWidth}%`,
                        margin: margin,
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Round the number with the given base.
 *
 * - ceil(0.5) === 1
 * - ceil(15, 100) === 100
 * - ceil(1250, 1000) === 2000
 */
function ceil(number: number, base: number = 1): number {
    return Math.ceil(number / base) * base;
}
