import { PropsWithChildren, useMemo } from 'react';
import React from 'react';
import { Link } from '../Link';

import { isEmptyText, stripTags } from '../../lib';
import classNames from 'classnames';

interface DetailsProps {
    id: string;
    href: string;
    newTab: boolean;
    title?: string;
    description?: string;
    hasThumbnail: boolean;
    layout: 'vertical' | 'horizontal';
}

export function Details({
    title,
    description,
    href,
    id,
    newTab,
    layout,
    hasThumbnail,
    children,
}: PropsWithChildren<DetailsProps>) {
    const { isDescriptionShort, isTitleShort } = useMemo(() => {
        let titleOneLineLength = 33;
        let descriptionOneLineLength = 45;

        if (layout === 'vertical' || !hasThumbnail) {
            titleOneLineLength = 52;
            descriptionOneLineLength = 75;
        }

        return {
            isTitleShort: (title ?? '').length <= titleOneLineLength,
            isDescriptionShort: (description ?? '')?.length <= descriptionOneLineLength,
        };
    }, [title, description, layout, hasThumbnail]);

    return (
        <div className={'prezly-slate-bookmark-card-component__details'}>
            {!isEmptyText(title) && (
                <Link
                    id={id}
                    className={classNames('prezly-slate-bookmark-card-component__title', {
                        ['prezly-slate-bookmark-card-component__title--short-title']: isTitleShort,
                        ['prezly-slate-bookmark-card-component__title--short-description']:
                            isDescriptionShort,
                    })}
                    href={href}
                    newTab={newTab}
                >
                    {stripTags(title)}
                </Link>
            )}

            {!isEmptyText(description) && (
                <div
                    className={classNames('prezly-slate-bookmark-card-component__description', {
                        ['prezly-slate-bookmark-card-component__description--short-title']:
                            isTitleShort,
                        ['prezly-slate-bookmark-card-component__description--short-description']:
                            isDescriptionShort,
                    })}
                >
                    {stripTags(description)}
                </div>
            )}

            {children}
        </div>
    );
}
