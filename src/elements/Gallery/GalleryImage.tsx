import type { UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';

import { Media, Rollover } from '../../components';

import './GalleryImage.scss';

interface Props {
    image: UploadcareImage;
    onClick: (image: UploadcareImage) => void;
    rounded?: boolean;
    style?: CSSProperties;
}

export function GalleryImage({ image, onClick, rounded = false, style }: Props) {
    const handleClick = () => {
        onClick(image);
    };

    return (
        <Rollover
            id={`gallery-image-${image.uuid}`}
            className={classNames('prezly-slate-gallery-image', {
                'prezly-slate-gallery-image--with-border-radius': rounded,
            })}
            caption={image.caption}
            onClick={handleClick}
            style={style}
        >
            <Media className="prezly-slate-gallery-image__media" image={image}>
                {image.caption}
            </Media>
        </Rollover>
    );
}
