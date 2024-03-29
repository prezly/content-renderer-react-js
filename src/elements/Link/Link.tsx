import type { LinkNode } from '@prezly/story-content-format';
import classNames from 'classnames';
import type { AnchorHTMLAttributes } from 'react';

import './Link.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    node: LinkNode;
}

export function Link({ children, className, node, ...props }: Props) {
    return (
        <a
            className={classNames('prezly-slate-link', className)}
            href={node.href}
            target={node.new_tab ? '_blank' : '_self'}
            rel={node.new_tab ? 'noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    );
}
