import { StoryBookmarkNode, STORY_BOOKMARK_NODE_TYPE } from '@prezly/slate-types';
import { StoryBookmarkLayout } from '@prezly/slate-types';
import React, { useRef, useState, useMemo } from 'react';

import { useResizeObserver, utils } from '../../lib';

import { BookmarkCard } from '../../components';
import { useElementContext } from '../../RendererContext';

interface StoryBookmarkBlockProps {
    node: StoryBookmarkNode;
}

const HORIZONTAL_LAYOUT_MIN_WIDTH = 480;

export function StoryBookmark({ node }: StoryBookmarkBlockProps) {
    const ctx = useElementContext(STORY_BOOKMARK_NODE_TYPE);
    const card = useRef<HTMLDivElement | null>(null);
    const [isSmallViewport, setSmallViewport] = useState(false);

    useResizeObserver(card.current, function (entries) {
        entries.forEach(function (entry) {
            setSmallViewport(entry.contentRect.width < HORIZONTAL_LAYOUT_MIN_WIDTH);
        });
    });

    if (!ctx) {
        return null;
    }

    const story = ctx.getStory(node.story.uuid);

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
        <BookmarkCard.Container
            layout={actualLayout}
            ref={card}
            className="prezly-slate-story-bookmark"
        >
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
