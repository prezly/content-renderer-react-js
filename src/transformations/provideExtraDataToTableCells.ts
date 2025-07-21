import { type Node, TableNode } from '@prezly/story-content-format';

export function provideExtraDataToTableCells<T extends Node>(node: T): T {
    if (TableNode.isTableNode(node)) {
        const isHeaderFirstRow =
            node.header &&
            node.header.length === 1 &&
            node.header[0] === TableNode.TableHeader.FIRST_ROW;

        const isHeaderFirstColumn =
            node.header &&
            node.header.length === 1 &&
            node.header[0] === TableNode.TableHeader.FIRST_COLUMN;

        return {
            ...node,
            children: node.children.map((row, rowIndex) => ({
                ...row,
                children: row.children.map((cell, cellIndex) => ({
                    ...cell,
                    width: node.colSizes?.[cellIndex],
                    isHeader:
                        (isHeaderFirstRow && rowIndex === 0) ||
                        (isHeaderFirstColumn && cellIndex === 0),
                })),
            })),
        };
    }

    return node;
}
