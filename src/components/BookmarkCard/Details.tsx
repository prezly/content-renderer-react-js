import type { PropsWithChildren } from 'react';
import React from 'react';

import { utils } from '../../lib';

interface DetailsProps {
    title?: string;
    description?: string;
    href: string;
}

export function Details({ title, description, href, children }: PropsWithChildren<DetailsProps>) {
    return (
        <div className={'prezly-slate-bookmark-card-component__details'}>
            {!utils.isEmptyText(title) && (
                <a
                    className={'prezly-slate-bookmark-card-component__title'}
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {title}
                </a>
            )}

            {!utils.isEmptyText(description) && (
                <div className={'prezly-slate-bookmark-card-component__description'}>
                    {description}
                </div>
            )}

            {children}
        </div>
    );
}
