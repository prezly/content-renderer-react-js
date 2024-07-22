import type { TableCellNode } from '@prezly/story-content-format';
import { TableNode } from '@prezly/story-content-format';

function isFirstRow(table: TableNode, cell: TableCellNode): boolean {
    return table.children[0]?.children.some(
        (node) => JSON.stringify(node) === JSON.stringify(cell),
    );
}

function isFirstColumn(table: TableNode, cell: TableCellNode): boolean {
    return table.children.some((row) => JSON.stringify(row.children[0]) === JSON.stringify(cell));
}

export function isHeaderCell(table: TableNode, cell: TableCellNode): boolean {
    return Boolean(
        (table.header?.includes(TableNode.TableHeader.FIRST_ROW) && isFirstRow(table, cell)) ||
            (table.header?.includes(TableNode.TableHeader.FIRST_COLUMN) &&
                isFirstColumn(table, cell)),
    );
}
