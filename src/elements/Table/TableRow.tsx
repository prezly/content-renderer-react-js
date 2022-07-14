import type { TableRowNode } from '@prezly/story-content-format';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    node: TableRowNode;
}

export function TableRow({ children }: Props) {
    return <tr className="prezly-table-row ">{children}</tr>;
}
