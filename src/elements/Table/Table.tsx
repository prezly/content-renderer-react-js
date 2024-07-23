import type { TableNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableElement> {
    node: TableNode;
}

export function Table({ children, node }: Props) {
    return (
        <table
            className={classNames('prezly-slate-table', {
                'prezly-slate-table--withBorders': node.border,
            })}
        >
            <tbody>{children}</tbody>
        </table>
    );
}
