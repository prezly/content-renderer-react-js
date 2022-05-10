import type { StoryBookmarkNode } from '@prezly/story-content-format';
import type { Story } from '@prezly/sdk';
import React from 'react';

import { BookmarkCard } from '../../components';

interface Props {
    node: StoryBookmarkNode;
    story: Story;
}

export function StoryBookmark({ node, story }: Props) {
    return (
        <BookmarkCard
            hrefId={`story-bookmark-${node.uuid}`}
            layout={node.layout}
            newTab={node.new_tab}
            showThumbnail={node.show_thumbnail}
            uuid={node.uuid}
            oembed={story.oembed}
            className="prezly-slate-story-bookmark"
        />
    );
}
