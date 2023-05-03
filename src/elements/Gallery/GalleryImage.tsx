import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';

import { Media, Rollover } from '../../components';

import './GalleryImage.scss';

interface Props {
    originalImage: UploadcareImage;
    previewImage: UploadcareImage;
    onClick: (image: UploadcareImage) => void;
    rounded?: boolean;
    style?: CSSProperties;
}

export function GalleryImage({
    originalImage,
    previewImage,
    onClick,
    rounded = false,
    style,
}: Props) {
    return (
        <Rollover
            id={`gallery-image-${originalImage.uuid}`}
            className={classNames('prezly-slate-gallery-image', {
                'prezly-slate-gallery-image--with-border-radius': rounded,
            })}
            caption={originalImage.caption}
            href={originalImage.cdnUrl}
            onClick={() => onClick(originalImage)}
            style={style}
        >
            <Media
                className="prezly-slate-gallery-image__media"
                image={previewImage}
                title={originalImage.caption}
            />
        </Rollover>
    );
}
