import type { LinkNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { AnchorHTMLAttributes, FunctionComponent } from 'react';

import './Link.scss';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    node: LinkNode;
}

export const Link: FunctionComponent<Props> = ({ children, className, node, ...props }) => (
    <a
        className={classNames('prezly-slate-link', className)}
        href={node.href}
        target={node.new_tab ? '_blank' : '_self'}
        {...props}
    >
        {children}
    </a>
);
