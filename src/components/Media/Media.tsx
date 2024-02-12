import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { CSSProperties } from 'react';

import { convertSizesToWidths } from './lib';

import './Media.scss';

interface Props {
    className?: string;
    image: UploadcareImage;
    style?: CSSProperties;
    title?: string;
    sizes?: string;
}

export function Media({
    className,
    image,
    style,
    title,
    sizes = '(max-width: 992px) 800px, (max-width: 576px) 400px, 1200px',
}: Props) {
    const computedClassName = classNames('prezly-slate-media', className, {
        'prezly-slate-media--image': !image.isGif(),
        'prezly-slate-media--video': image.isGif(),
    });

    if (image.isGif()) {
        const video = image.toGifVideo().bestQuality();
        const sourceWebm = video.format('webm').cdnUrl;
        const sourceMp4 = video.format('mp4').cdnUrl;
        const poster = image.format('png').cdnUrl;

        return (
            <video
                poster={poster}
                preload="none"
                autoPlay
                className={computedClassName}
                loop
                muted
                playsInline
                style={style}
                title={title}
                // TODO: Some browsers are complaining about this property
                // eslint-disable-next-line react/no-unknown-property
                webkit-playsinline="true"
            >
                <source src={sourceWebm} type="video/webm" />
                <source src={sourceMp4} type="video/mp4" />
            </video>
        );
    }

    return (
        <img
            alt={title}
            className={computedClassName}
            src={image.format().cdnUrl}
            srcSet={convertSizesToWidths(sizes)
                .map((width) => image.srcSet(width))
                .filter(Boolean)
                .join(', ')}
            sizes={sizes}
            width={image.originalWidth}
            height={image.originalHeight}
            style={style}
            title={title}
        />
    );
}
