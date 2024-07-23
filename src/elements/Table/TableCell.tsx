import type { TableCellNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    node: TableCellNode & { isHeader?: boolean };
}

export function TableCell({ children, node }: Props) {
    const Cell = node.isHeader ? 'th' : 'td';

    return (
        <Cell
            className={classNames('prezly-slate-table-cell', {
                'prezly-slate-table-cell--header': node.isHeader,
            })}
            colSpan={node.colspan}
            rowSpan={node.rowspan}
        >
            {children}
        </Cell>
    );
}
