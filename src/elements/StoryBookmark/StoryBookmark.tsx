import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import { StoryBookmarkLayout } from '@prezly/slate-types';
import React, { useRef, useState, useMemo } from 'react';

import { useResizeObserver, utils } from '../../lib';

import { BookmarkCard } from '../../components';

interface StoryBookmarkBlockProps {
    node: StoryBookmarkNode;
    getStory?: (uuid: string) => Story;
}

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

export function StoryBookmark({ node, getStory }: StoryBookmarkBlockProps) {
    const story = getStory?.(node.story.uuid);
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    useResizeObserver(card.current, function (entries) {
        entries.forEach(function (entry) {
            setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
        });
    });

    if (!story) {
        return null;
    }

    const showThumbnail = node.show_thumbnail && story.oembed.thumbnail_url;

    const isEmpty =
        !showThumbnail &&
        utils.isEmptyText(story.oembed.title) &&
        utils.isEmptyText(story.oembed.description);

    const actualLayout = useMemo(() => {
        if (!showThumbnail) {
            return StoryBookmarkLayout.HORIZONTAL;
        } else if (isSmallViewport) {
            return StoryBookmarkLayout.VERTICAL;
        } else {
            return node.layout;
        }
    }, [showThumbnail, isSmallViewport, node.layout]);

    return (
        <BookmarkCard.Container layout={actualLayout} ref={card}>
            {showThumbnail && story.oembed.thumbnail_url && (
                <BookmarkCard.Thumbnail
                    href={story.oembed.url}
                    src={story.oembed.thumbnail_url}
                    width={story.oembed.thumbnail_width}
                    height={story.oembed.thumbnail_height}
                />
            )}
            <BookmarkCard.Details
                href={story.oembed.url}
                title={story.oembed.title}
                description={story.oembed.description}
            >
                <BookmarkCard.Provider
                    showUrl={isEmpty}
                    url={story.oembed.url}
                    providerName={story.oembed.provider_name}
                    providerUrl={story.oembed.provider_url}
                />
            </BookmarkCard.Details>
        </BookmarkCard.Container>
    );
}
