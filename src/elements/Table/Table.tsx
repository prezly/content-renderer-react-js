import type { TableCellNode, TableNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import { Children, cloneElement, type HTMLAttributes, isValidElement } from 'react';

import { isHeaderCell } from './TableContext';

interface Props extends HTMLAttributes<HTMLTableElement> {
    node: TableNode;
}

export function Table({ children, node }: Props) {
    function isHeader(cell: TableCellNode): boolean {
        return isHeaderCell(node, cell);
    }

    return (
        <table
            className={classNames('prezly-slate-table', {
                'prezly-slate-table--withBorders': node.border,
            })}
        >
            <tbody>
                {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return cloneElement<{ isHeader?: (node: TableCellNode) => boolean }>(
                            // @ts-expect-error I don't know how to type this :|
                            child,
                            { isHeader },
                        );
                    }

                    return child;
                })}
            </tbody>
        </table>
    );
}
