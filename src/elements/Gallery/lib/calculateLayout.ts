import { linearPartition } from '@prezly/linear-partition';

interface Image {
    aspectRatio: number;
}

interface Parameters {
    idealHeight: number;
    images: Image[];
    viewportWidth: number;
}

interface Tile {
    /**
     * Image index in the original images array.
     */
    index: number;
    width: number;
    height: number;
}

type Layout = Tile[][];

export function calculateLayout({ idealHeight, images, viewportWidth }: Parameters): Layout {
    if (idealHeight <= 0 || viewportWidth <= 0 || images.length === 0) {
        return [];
    }

    const totalWidth = images.reduce((sum, image) => sum + image.aspectRatio * idealHeight, 0);
    const rowsCount = Math.max(
        1, // forceFullWidth
        Math.round(totalWidth / viewportWidth),
    );

    const weights = images.map((image) => 100 * image.aspectRatio);
    const partition = linearPartition(weights, rowsCount);
    const computedLayout: Layout = [];

    let offset = 0;

    for (const row of partition) {
        const rowImages = row.map((_, index) => images[offset + index]);
        const aspectRatioSum = rowImages.reduce((sum, image) => sum + image.aspectRatio, 0);
        let availableWidth = viewportWidth;
        const computedRow: Tile[] = [];

        rowImages.forEach((image, index) => {
            const width =
                index === rowImages.length - 1
                    ? availableWidth
                    : (viewportWidth / aspectRatioSum) * image.aspectRatio;
            const height = viewportWidth / aspectRatioSum;
            availableWidth -= width;
            computedRow.push({ index: offset + index, width, height });
        });
        computedLayout.push(computedRow);
        offset += row.length;
    }

    return computedLayout;
}
