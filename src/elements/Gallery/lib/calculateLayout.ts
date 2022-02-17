import { linearPartition } from '@prezly/linear-partition';

interface Image {
    aspectRatio: number;
}

interface Parameters<T extends Image> {
    idealHeight: number;
    images: T[];
    viewportWidth: number;
}

interface Tile<T extends Image> {
    image: T;
    width: number;
    height: number;
}

type Layout<T extends Image> = Tile<T>[][];

export function calculateLayout<T extends Image>({
    idealHeight,
    images,
    viewportWidth,
}: Parameters<T>): Layout<T> {
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
    const computedRows: Layout<T> = [];

    let index = 0;
    partition.forEach((row) => {
        const rowBuffer = row.map((_, rowImageIndex) => images[index + rowImageIndex]);
        const aspectRatioSum = rowBuffer.reduce((sum, image) => sum + image.aspectRatio, 0);
        let widthSum = 0;
        const computedRow: Tile<T>[] = [];

        rowBuffer.forEach((image, rowImageIndex) => {
            const width =
                rowImageIndex === rowBuffer.length - 1
                    ? viewportWidth - widthSum
                    : (viewportWidth / aspectRatioSum) * image.aspectRatio;
            const height = viewportWidth / aspectRatioSum;
            widthSum += width;
            computedRow.push({ width, height, image });
        });
        computedRows.push(computedRow);
        index += row.length;
    });

    return computedRows;
}
