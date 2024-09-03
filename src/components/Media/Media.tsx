import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { CSSProperties } from 'react';

import './Media.scss';

interface Props {
    className?: string;
    image: UploadcareImage;
    style?: CSSProperties;
    title?: string;
}

export function Media({ className, image, style, title }: Props) {
    const computedClassName = classNames('prezly-slate-media', className, {
        'prezly-slate-media--image': !image.isGif(),
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
            srcSet={[image.srcSet(1200), image.srcSet(800), image.srcSet(400)]
                .filter(Boolean)
                .join(', ')}
            sizes={`(max-width: 992px) 800px, (max-width: 576px) 400px, 1200px`}
            style={style}
            title={title}
        />
    );
}
