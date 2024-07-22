import type { TableCellNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    isHeader?: (node: TableCellNode) => boolean;
    node: TableCellNode;
}

export function TableCell({ children, isHeader, node }: Props) {
    const isHeaderCell = isHeader?.(node);
    const Cell = isHeaderCell ? 'th' : 'td';

    return (
        <Cell
            className={classNames('prezly-slate-table-cell', {
                'prezly-slate-table-cell--header': isHeaderCell,
            })}
            colSpan={node.colspan}
            rowSpan={node.rowspan}
        >
            {children}
        </Cell>
    );
}
