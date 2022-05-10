import { GalleryNode } from '@prezly/story-content-format';

export const DEFAULT_GALLERY_WIDTH_SSR: Record<GalleryNode.Layout, number> = {
    [GalleryNode.Layout.CONTAINED]: 700,
    [GalleryNode.Layout.EXPANDED]: 840,
    [GalleryNode.Layout.FULL_WIDTH]: 1280,
};

export const IMAGE_PADDING: Record<GalleryNode.Padding, number> = {
    [GalleryNode.Padding.S]: 0,
    [GalleryNode.Padding.M]: 2,
    [GalleryNode.Padding.L]: 8,
};

export const IMAGE_SIZE: Record<GalleryNode['thumbnail_size'], number> = {
    [GalleryNode.ImageSize.XS]: 90,
    [GalleryNode.ImageSize.S]: 200,
    [GalleryNode.ImageSize.M]: 300,
    [GalleryNode.ImageSize.L]: 450,
    [GalleryNode.ImageSize.XL]: 1000,
};
