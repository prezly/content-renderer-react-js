import type { Story } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
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
