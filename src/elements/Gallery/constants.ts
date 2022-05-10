import { GalleryNode } from '@prezly/story-content-format';

export const DEFAULT_GALLERY_WIDTH_SSR: Record<GalleryNode.Layout, number> = {
    [GalleryNode.Layout.CONTAINED]: 700,
    [GalleryNode.Layout.EXPANDED]: 840,
    [GalleryNode.Layout.FULL_WIDTH]: 1280,
};

export const IMAGE_PADDING: Record<GalleryNode.Padding, number> = {
    [GalleryNode.Padding.SMALL]: 0,
    [GalleryNode.Padding.MEDIUM]: 2,
    [GalleryNode.Padding.LARGE]: 8,
};

export const IMAGE_SIZE: Record<GalleryNode['thumbnail_size'], number> = {
    [GalleryNode.ImageSize.XSMALL]: 90,
    [GalleryNode.ImageSize.SMALL]: 200,
    [GalleryNode.ImageSize.MEDIUM]: 300,
    [GalleryNode.ImageSize.LARGE]: 450,
    [GalleryNode.ImageSize.XLARGE]: 1000,
};
