import { StoryBookmarkNode, STORY_BOOKMARK_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

import { BookmarkCard } from '../../components';
import { useElementContext } from '../../RendererContext';

interface StoryBookmarkBlockProps {
    node: StoryBookmarkNode;
}

export function StoryBookmark({ node }: StoryBookmarkBlockProps) {
    const ctx = useElementContext(STORY_BOOKMARK_NODE_TYPE);
    const story = ctx?.getStory(node.story.uuid);

    if (!story) {
        return null;
    }

    return (
        <BookmarkCard
            hrefId={`story-bookmark-${node.uuid}`}
            node={{
                layout: node.layout,
                newTab: node.new_tab,
                showThumbnail: node.show_thumbnail,
                uuid: node.uuid,
            }}
            oembed={story.oembed}
            className="prezly-slate-story-bookmark"
        />
    );
}
