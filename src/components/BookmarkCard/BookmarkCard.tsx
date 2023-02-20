import React from 'react';
import type { OEmbedInfo } from '@prezly/sdk';
import { isEmptyText, normalizeUrl } from '../../lib';
import { Container } from './Container';
import { Details } from './Details';
import { Provider } from './Provider';
import { Thumbnail } from './Thumbnail';

interface BookmarkCardProps {
    oembed: OEmbedInfo;
    uuid: string;
    showThumbnail: boolean;
    layout: 'vertical' | 'horizontal';
    newTab: boolean;
    hrefId: string;
    className?: string;
}

export function BookmarkCard(props: BookmarkCardProps) {
    const showThumbnail = Boolean(props.showThumbnail && props.oembed.thumbnail_url);

    const isEmpty = !showThumbnail && isEmptyText(props.oembed.title) && isEmptyText(props.oembed.description);
    const normalizedUrl = normalizeUrl(props.oembed.url);

    return (
        <Container defaultLayout={props.layout} hasThumbnail={showThumbnail} className={props.className}>
            {showThumbnail && props.oembed.thumbnail_url && (
                <Thumbnail
                    newTab={props.newTab}
                    href={normalizedUrl}
                    src={props.oembed.thumbnail_url}
                    width={props.oembed.thumbnail_width}
                    height={props.oembed.thumbnail_height}
                />
            )}
            <Details
                id={props.hrefId}
                href={normalizedUrl}
                newTab={props.newTab}
                title={props.oembed.title}
                description={props.oembed.description}
                layout={props.layout}
                hasThumbnail={showThumbnail}
            >
                <Provider
                    showUrl={isEmpty}
                    url={normalizedUrl}
                    providerName={props.oembed.provider_name}
                    providerUrl={props.oembed.provider_url}
                />
            </Details>
        </Container>
    );
}
