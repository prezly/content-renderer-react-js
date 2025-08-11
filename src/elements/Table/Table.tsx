import type { TableNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableElement> {
    node: TableNode;
}

export function Table({ children, node }: Props) {
    return (
        <div className="prezly-slate-table-container">
            <table
                className={classNames('prezly-slate-table', {
                    'prezly-slate-table--withFixedColumns': node.colSizes !== undefined,
                })}
            >
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
