import type { TableNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { CSSProperties, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableElement> {
    node: TableNode;
}

const BORDER_WIDTH = 1;

export function Table({ children, node }: Props) {
    const withFixedColumns = node.colSizes !== undefined;

    const width =
        typeof node.colSizes !== 'undefined'
            ? node.colSizes.reduce((total, columnWidth) => total + columnWidth, BORDER_WIDTH)
            : undefined;

    return (
        <div
            className={classNames('prezly-slate-table-container', {
                'prezly-slate-table-container--withFixedColumns': withFixedColumns,
            })}
            style={{ '--width': `${width}px` } as CSSProperties}
        >
            <table
                className={classNames('prezly-slate-table', {
                    'prezly-slate-table--withFixedColumns': withFixedColumns,
                })}
                style={{ width }}
            >
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
