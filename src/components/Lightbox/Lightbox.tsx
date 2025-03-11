'use client';

import type { UploadcareImage } from '@prezly/uploadcare';
import { useEventListener } from '@react-hookz/web';
import classNames from 'classnames';
import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect } from 'react';
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
    title?: string;
}

export function Lightbox({
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
    title,
}: Props) {
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
        // TODO: Address this. Simply adding `onOpen` to the deps might introduce an infinite loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    if (typeof window === 'undefined') {
        // Do not render Lightbox outside of browser environment (i.e. SSR)
        return null;
    }

    if (image === null) {
        return (
            <Modal
                className={classNames('prezly-slate-lightbox', className)}
                isOpen={false}
                // This functionality has issues on React 18.
                ariaHideApp={false}
            />
        );
    }

    return (
        <Modal
            className={classNames('prezly-slate-lightbox', className)}
            isOpen
            onRequestClose={onClose}
            // This functionality has issues on React 18.
            ariaHideApp={false}
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
                    <Media
                        className="prezly-slate-lightbox__image"
                        image={previewImage(image)}
                        title={title}
                    />

                    <div className="prezly-slate-lightbox__actions">
                        <a
                            className="prezly-slate-lightbox__download"
                            download
                            href={image.downloadUrl}
                            rel="nofollow noreferrer noopener"
                            target="_blank"
                            title="Download full-size"
                            onClick={() => onDownload(image)}
                        >
                            Download full-size
                        </a>

                        <PinterestButton
                            className="prezly-slate-lightbox__pinterest"
                            image={previewImage(image).cdnUrl}
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
}

function defaultPreviewImage(image: UploadcareImage): UploadcareImage {
    return image.preview(2000, 2000);
}
