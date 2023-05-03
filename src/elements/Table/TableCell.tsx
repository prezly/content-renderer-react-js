import type { TableCellNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';

import { useTableContext } from './TableContext';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    node: TableCellNode;
}

export function TableCell({ children, node }: Props) {
    const ctx = useTableContext();

    if (!ctx) {
        console.warn(`${TableCell.name} requires wrapping in TableContext.`);
    }

    const isHeaderCell = useMemo(() => ctx?.isHeaderCell(node), [node, ctx]);

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
