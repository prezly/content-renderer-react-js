import type { UploadcareImage } from '@prezly/slate-types';
import { useState } from 'react';

interface LightboxNavigation {
    image: UploadcareImage | null;
    hasNext: boolean;
    hasPrevious: boolean;
    onOpen: (image: UploadcareImage) => void;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export function useLightboxNavigation(images: UploadcareImage[]): LightboxNavigation {
    const [image, setImage] = useState<UploadcareImage | null>(null);
    const currentIndex = image === null ? null : images.indexOf(image);
    const hasNext = typeof currentIndex === 'number' && images.length > 1;
    const hasPrevious = hasNext;

    function onClose() {
        setImage(null);
    }

    function onPrevious() {
        if (typeof currentIndex === 'number' && hasPrevious) {
            const previousIndex = (images.length + currentIndex - 1) % images.length;
            setImage(images[previousIndex]);
        }
    }

    function onNext() {
        if (typeof currentIndex === 'number' && hasNext) {
            const nextIndex = (currentIndex + 1) % images.length;
            setImage(images[nextIndex]);
        }
    }

    return {
        image,
        hasNext,
        hasPrevious,
        onOpen: setImage,
        onClose,
        onNext,
        onPrevious,
    };
}
