import type { TableRowNode } from '@prezly/story-content-format';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    node: TableRowNode;
}

export function TableRow({ children }: Props) {
    return <tr className="prezly-slate-table-row">{children}</tr>;
}
