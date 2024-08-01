import type { Contact, CoverageEntry } from '@prezly/sdk';
import classNames from 'classnames';
import type { ReactNode } from 'react';

import { formatBytes } from '../../lib';

import { getCoverageImageUrl } from './getCoverageImageUrl';

interface Props {
    className?: string;
    coverage: CoverageEntry;
    layout: 'vertical' | 'horizontal';
    renderDate: (date: string) => ReactNode;
    withThumbnail: boolean;
}

export function CoverageCard({ className, coverage, layout, renderDate, withThumbnail }: Props) {
    const imageUrl = getCoverageImageUrl(coverage);
    const href = coverage.attachment_oembed?.url || coverage.url;
    const autoLayout = withThumbnail && imageUrl ? layout : 'horizontal';

    return (
        <div
            className={classNames('prezly-slate-coverage-card-component__container', className, {
                horizontal: autoLayout === 'horizontal',
                vertical: autoLayout === 'vertical',
            })}
        >
            {imageUrl && withThumbnail && <Thumbnail src={imageUrl} href={href} />}

            <div className="prezly-slate-coverage-card-component__details">
                <Title coverage={coverage} href={href} />

                <Description coverage={coverage} />

                <Meta
                    author={coverage.author_contact}
                    date={coverage.published_at}
                    outlet={coverage.organisation_contact}
                    renderDate={renderDate}
                />
            </div>
        </div>
    );
}

function Thumbnail(props: { href: string | null; src: string }) {
    const { href, src } = props;
    const Tag = href ? 'a' : 'div';

    return (
        <Tag
            href={href || undefined}
            className="prezly-slate-coverage-card-component__thumbnail"
            style={{ backgroundImage: `url("${src}")` }}
        >
            <img
                className="prezly-slate-coverage-card-component__thumbnail-image"
                src={src}
                alt="Website preview"
            />
        </Tag>
    );
}

function Title(props: { coverage: CoverageEntry; href: string | null }) {
    const { coverage, href } = props;
    const title =
        coverage.headline ||
        coverage.attachment_oembed?.title ||
        coverage.attachment?.filename ||
        'Untitled';
    const Tag = href ? 'a' : 'div';

    return (
        <Tag className="prezly-slate-coverage-card-component__title" href={href || undefined}>
            {title}
        </Tag>
    );
}

function Description(props: { coverage: CoverageEntry }) {
    const { coverage } = props;

    const description = coverage.attachment_oembed?.description;

    if (description) {
        return (
            <div className="prezly-slate-coverage-card-component__description">{description}</div>
        );
    }

    if (coverage.attachment) {
        return (
            <div className="prezly-slate-coverage-card-component__description">
                {formatBytes(coverage.attachment.size)}
            </div>
        );
    }

    return null;
}

function Meta(props: {
    author: Contact | null;
    date: string | null;
    outlet: Contact | null;
    renderDate: (date: string) => ReactNode;
}) {
    const { author, date, outlet, renderDate } = props;

    const hasOutlet = outlet !== null;
    const hasAuthor = author !== null;
    const hasDate = date !== null;

    if (!hasOutlet && !hasAuthor && !hasDate) {
        return null;
    }

    return (
        <div className="prezly-slate-coverage-card-component__meta">
            {hasOutlet && (
                <>
                    <span className="prezly-slate-coverage-card-component__outlet">
                        <img
                            className="prezly-slate-coverage-card-component__outlet-icon"
                            src={outlet.avatar_url}
                            alt={`${outlet.display_name} avatar`}
                            aria-hidden="true"
                        />
                        <span className="prezly-slate-coverage-card-component__outlet-name">
                            {outlet.display_name}
                        </span>
                    </span>
                    {(hasAuthor || hasDate) && <span>/</span>}
                </>
            )}
            {hasAuthor && (
                <>
                    <span className="prezly-slate-coverage-card-component__author" title="Author">
                        {author.display_name}
                    </span>
                    {hasDate && <span>/</span>}
                </>
            )}
            {hasDate && (
                <span className="prezly-slate-coverage-card-component__publication-date">
                    {renderDate(date)}
                </span>
            )}
        </div>
    );
}
