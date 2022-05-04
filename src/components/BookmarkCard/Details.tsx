import type { PropsWithChildren } from 'react';
import React from 'react';
import { Link } from '../Link';

import { utils, stripTags } from '../../lib';

interface DetailsProps {
    id: string;
    href: string;
    newTab: boolean;
    title?: string;
    description?: string;
}

export function Details({
    title,
    description,
    href,
    id,
    newTab,
    children,
}: PropsWithChildren<DetailsProps>) {
    return (
        <div className={'prezly-slate-bookmark-card-component__details'}>
            {!utils.isEmptyText(title) && (
                <Link
                    id={id}
                    className={'prezly-slate-bookmark-card-component__title'}
                    href={href}
                    newTab={newTab}
                >
                    {stripTags(title)}
                </Link>
            )}

            {!utils.isEmptyText(description) && (
                <div className={'prezly-slate-bookmark-card-component__description'}>
                    {stripTags(description)}
                </div>
            )}

            {children}
        </div>
    );
}
