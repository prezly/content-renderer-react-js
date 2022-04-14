import type { BookmarkNode } from '@prezly/slate-types';
import React from 'react';

import { BookmarkCard } from '../../components';

interface BookmarkProps {
    node: BookmarkNode;
}

export function Bookmark({ node }: BookmarkProps) {
    return (
        <BookmarkCard
            hrefId={`bookmark-${node.uuid}`}
            node={{
                layout: node.layout,
                newTab: node.new_tab,
                showThumbnail: node.show_thumbnail,
                uuid: node.uuid,
            }}
            oembed={node.oembed}
            className="prezly-slate-bookmark"
        />
    );
}
