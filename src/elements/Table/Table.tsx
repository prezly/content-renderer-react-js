import type { TableNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

import { TableContextProvider } from './TableContext';

interface Props extends HTMLAttributes<HTMLTableElement> {
    node: TableNode;
}

export function Table({ children, node }: Props) {
    return (
        <TableContextProvider table={node}>
            <div className="prezly-slate-table-container">
                <table
                    className={classNames('prezly-slate-table', {
                        'prezly-slate-table--withBorders': node.border,
                    })}
                >
                    <tbody>{children}</tbody>
                </table>
            </div>
        </TableContextProvider>
    );
}
