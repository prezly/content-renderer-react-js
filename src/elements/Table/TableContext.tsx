import type { TableCellNode } from '@prezly/story-content-format';
import { TableNode } from '@prezly/story-content-format';
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface ContextProps {
    isHeaderCell: (cell: TableCellNode) => boolean;
}

const TableContext = createContext<ContextProps | null>(null);

interface Props {
    table: TableNode;
}

export function TableContextProvider({ table, children }: PropsWithChildren<Props>) {
    const value = useMemo<ContextProps>(
        () => ({
            isHeaderCell: (cell) => isHeaderCell(table, cell),
        }),
        [table],
    );

    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function useTableContext() {
    return useContext(TableContext);
}

function isFirstRow(table: TableNode, cell: TableCellNode): boolean {
    return table.children[0]?.children.includes(cell);
}

function isFirstColumn(table: TableNode, cell: TableCellNode): boolean {
    return table.children.some((row) => row.children[0] === cell);
}

function isHeaderCell(table: TableNode, cell: TableCellNode): boolean {
    return Boolean(
        (table.header?.includes(TableNode.TableHeader.FIRST_ROW) && isFirstRow(table, cell)) ||
            (table.header?.includes(TableNode.TableHeader.FIRST_COLUMN) &&
                isFirstColumn(table, cell)),
    );
}
