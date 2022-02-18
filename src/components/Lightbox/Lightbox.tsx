import type { UploadcareImage } from '@prezly/slate-types';
import { useEventListener } from '@react-hookz/web';
import classNames from 'classnames';
import React, { FunctionComponent, KeyboardEvent, ReactNode, useEffect } from 'react';
import Modal from 'react-modal';

import { ChevronLeft, ChevronRight, Close } from '../../icons';
import { noop } from '../../lib';

import { Media } from '../Media';
import { PinterestButton } from '../PinterestButton';

import './Lightbox.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    image: UploadcareImage | null;
    isNextEnabled?: boolean;
    isPreviousEnabled?: boolean;
    onClose: () => void;
    onDownload?: (image: UploadcareImage) => void;
    onNext?: () => void;
    onOpen?: (image: UploadcareImage) => void;
    onPrevious?: () => void;
    previewImage?: (image: UploadcareImage) => UploadcareImage;
}

export const Lightbox: FunctionComponent<Props> = ({
    children,
    className,
    image,
    isNextEnabled,
    isPreviousEnabled,
    onClose,
    onDownload = noop,
    onNext = noop,
    onOpen = noop,
    onPrevious = noop,
    previewImage = defaultPreviewImage,
}) => {
    useEventListener(
        typeof window !== 'undefined' ? window : globalThis,
        'keydown',
        (event: KeyboardEvent) => {
            if (image === null) {
                return;
            }

            if (event.key === 'Esc') {
                onClose();
            }

            if (event.key === 'ArrowLeft') {
                onPrevious();
            }

            if (event.key === 'ArrowRight') {
                onNext();
            }
        },
    );

    useEffect(() => {
        if (image) {
            onOpen(image);
        }
    }, [image]);

    if (typeof window === 'undefined') {
        // Do not render Lightbox outside of browser environment (i.e. SSR)
        return null;
    }

    if (image === null) {
        return <Modal className={classNames('prezly-slate-lightbox', className)} isOpen={false} />;
    }

    return (
        <Modal
            className={classNames('prezly-slate-lightbox', className)}
            isOpen
            onRequestClose={onClose}
        >
            <figure className="prezly-slate-lightbox__figure">
                <div className="prezly-slate-lightbox__nav">
                    <button
                        className="prezly-slate-lightbox__nav-button"
                        disabled={!isPreviousEnabled}
                        onClick={onPrevious}
                        type="button"
                        title="Previous (Left Arrow)"
                    >
                        <ChevronLeft className="prezly-slate-lightbox__nav-button-icon" />
                    </button>

                    <button
                        className="prezly-slate-lightbox__nav-button"
                        disabled={!isNextEnabled}
                        onClick={onNext}
                        type="button"
                        title="Next (Right Arrow)"
                    >
                        <ChevronRight className="prezly-slate-lightbox__nav-button-icon" />
                    </button>
                </div>

                <div className="prezly-slate-lightbox__image-container">
                    <Media className="prezly-slate-lightbox__image" image={previewImage(image)}>
                        {children}
                    </Media>

                    <div className="prezly-slate-lightbox__actions">
                        <a
                            className="prezly-slate-lightbox__download"
                            href={image.downloadUrl}
                            rel="noreferrer noopener"
                            target="_blank"
                            title="Download"
                            onClick={() => onDownload(image)}
                        >
                            Download
                        </a>

                        <PinterestButton
                            className="prezly-slate-lightbox__pinterest"
                            image={image.downloadUrl}
                        />
                    </div>
                </div>

                <div className="prezly-slate-lightbox__caption">{children}</div>
            </figure>

            <button
                className="prezly-slate-lightbox__close"
                onClick={onClose}
                type="button"
                title="Close (Esc)"
            >
                <Close className="prezly-slate-lightbox__close-icon" />
            </button>
        </Modal>
    );
};

function defaultPreviewImage(image: UploadcareImage): UploadcareImage {
    return image.preview(2000, 2000);
}
