import { GalleryNode, UploadcareImage } from '@prezly/slate-types';

export function prepareImages(node: GalleryNode, maxViewportWidth: number): UploadcareImage[] {
    return node.images
        .map(({ caption, file }) => UploadcareImage.createFromPrezlyStoragePayload(file, caption))
        .map((image) => image.preview(maxViewportWidth));
}
