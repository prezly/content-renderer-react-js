import React from 'react';

import { Selector, Component, Elements } from '@prezly/content-renderer-react-js';
import {
    isAttachmentNode,
    isBookmarkNode, isContactNode,
    isDividerNode,
    isDocumentNode,
    isEmbedNode, isGalleryNode,
    isHeadingNode,
    isHtmlNode,
    isImageNode,
    isLinkNode,
    isListItemNode,
    isListItemTextNode,
    isListNode,
    isMentionNode,
    isParagraphNode,
    isPlaceholderNode,
    isQuoteNode,
    isTextNode,
    isVideoNode,
} from '@prezly/slate-types';

import '@prezly/content-renderer-react-js/styles.css';
import './styles.css';

import story from './story.json';

export const App = () => (
    <div className="App">
        <Selector nodes={story.children}>
            <Component match={isTextNode} component={Elements.Text} />
            <Component match={isAttachmentNode} component={Elements.Attachment} />
            <Component match={isBookmarkNode} component={Elements.Bookmark} />
            <Component match={isParagraphNode} component={Elements.Paragraph} />
            <Component match={isHeadingNode} component={Elements.Heading} />
            <Component match={isQuoteNode} component={Elements.Quote} />
            <Component match={isDividerNode} component={Elements.Divider} />
            <Component match={isImageNode} component={Elements.Image} />
            <Component match={isVideoNode} component={Elements.Video} />
            <Component match={isEmbedNode} component={Elements.Embed} />
            <Component match={isLinkNode} component={Elements.Link} />
            <Component match={isPlaceholderNode} component={Elements.Placeholder} />
            <Component match={isMentionNode} component={Elements.Mention} />
            <Component match={isListNode} component={Elements.List} />
            <Component match={isListItemNode} component={Elements.ListItem} />
            <Component match={isListItemTextNode} component={Elements.ListItemText} />
            <Component match={isHtmlNode} component={Elements.Html} />
            <Component match={isGalleryNode} component={Elements.Gallery} />
            <Component match={isContactNode} component={Elements.Contact} />
            <Component match={isDocumentNode} component={Elements.Document} />
            <Component match={isAnyNode} component={Elements.Default} />
        </Selector>
    </div>
);

function isAnyNode() {
    return true;
}
