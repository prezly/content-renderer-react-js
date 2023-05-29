import type { BookmarkNode } from '@prezly/story-content-format';

import { BookmarkCard } from '../../components';

interface BookmarkProps {
    node: BookmarkNode;
}

export function Bookmark({ node }: BookmarkProps) {
    return (
        <BookmarkCard
            hrefId={`bookmark-${node.uuid}`}
            layout={node.layout}
            newTab={node.new_tab}
            showThumbnail={node.show_thumbnail}
            uuid={node.uuid}
            oembed={node.oembed}
            className="prezly-slate-bookmark"
        />
    );
}
