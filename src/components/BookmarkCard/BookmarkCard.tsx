import React from 'react';
import type { OEmbedInfo } from '@prezly/sdk';
import { utils } from '../../lib';
import { Container } from './Container';
import { Details } from './Details';
import { Provider } from './Provider';
import { Thumbnail } from './Thumbnail';
import type { BookmarkCardNodeInfo } from './BookmarkCard.types';

interface BookmarkCardProps {
    oembed: OEmbedInfo;
    node: BookmarkCardNodeInfo;
    hrefId: string;
    className?: string;
}

export function BookmarkCard({ node, oembed, hrefId, className }: BookmarkCardProps) {
    const showThumbnail = Boolean(node.showThumbnail && oembed.thumbnail_url);

    const isEmpty =
        !showThumbnail && utils.isEmptyText(oembed.title) && utils.isEmptyText(oembed.description);

    return (
        <Container defaultLayout={node.layout} hasThumbnail={showThumbnail} className={className}>
            {showThumbnail && oembed.thumbnail_url && (
                <Thumbnail
                    href={oembed.url}
                    src={oembed.thumbnail_url}
                    width={oembed.thumbnail_width}
                    height={oembed.thumbnail_height}
                />
            )}
            <Details
                id={hrefId}
                href={oembed.url}
                newTab={node.newTab}
                title={oembed.title}
                description={oembed.description}
            >
                <Provider
                    showUrl={isEmpty}
                    url={oembed.url}
                    providerName={oembed.provider_name}
                    providerUrl={oembed.provider_url}
                />
            </Details>
        </Container>
    );
}
