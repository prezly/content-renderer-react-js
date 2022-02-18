import { GalleryNode, UploadcareImage } from '@prezly/slate-types';

export function extractImages(node: GalleryNode): UploadcareImage[] {
    return node.images
        .map(({ caption, file }) => UploadcareImage.createFromPrezlyStoragePayload(file, caption));
}
