import type { OEmbedInfo } from '@prezly/sdk';
import type { StoryBookmarkNode } from '@prezly/slate-types';
import React from 'react';

import { BookmarkCard } from '../../components';

interface Props {
    node: StoryBookmarkNode;
    storyOEmbedInfo: OEmbedInfo;
}

export function StoryBookmark({ node, storyOEmbedInfo }: Props) {
    return (
        <BookmarkCard
            hrefId={`story-bookmark-${node.uuid}`}
            layout={node.layout}
            newTab={node.new_tab}
            showThumbnail={node.show_thumbnail}
            uuid={node.uuid}
            oembed={storyOEmbedInfo}
            className="prezly-slate-story-bookmark"
        />
    );
}
