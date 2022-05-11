import type { DocumentNode } from '@prezly/story-content-format';

import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

import './Document.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: DocumentNode;
}

export function Document({ children, className, node, ...props }: Props) {
    const { version } = node;

    return (
        <section className={classNames('prezly-slate-document', className)} data-version={version} {...props}>
            {children}
        </section>
    );
}
