import type { TableCellNode, TableRowNode } from '@prezly/story-content-format';
import type { HTMLAttributes } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

import { TableCell as TableCellComponent } from './TableCell';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    isHeader?: (node: TableCellNode) => boolean;
    node: TableRowNode;
}

export function TableRow({ children, isHeader }: Props) {
    return (
        <tr className="prezly-slate-table-row">
            {Children.map(children, (child) => {
                if (isValidElement(child) && child.type === TableCellComponent) {
                    // @ts-expect-error I don't know how to type this :|
                    return cloneElement<{ isHeader?: (node: TableCellNode) => boolean }>(child, {
                        isHeader,
                    });
                }

                return child;
            })}
        </tr>
    );
}
