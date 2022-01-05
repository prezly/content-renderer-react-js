import {
    ATTACHMENT_NODE_TYPE,
    BOOKMARK_NODE_TYPE,
    BULLETED_LIST_NODE_TYPE,
    CONTACT_NODE_TYPE,
    COVERAGE_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    DOCUMENT_NODE_TYPE,
    EMBED_NODE_TYPE,
    GALLERY_NODE_TYPE,
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    IMAGE_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    MENTION_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    PLACEHOLDER_NODE_TYPE,
    QUOTE_NODE_TYPE,
    VIDEO_NODE_TYPE,
    AttachmentNode,
    BookmarkNode,
    ContactNode,
    CoverageNode,
    DividerNode,
    DocumentNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    ImageNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    MentionNode,
    Node,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    TextNode,
    VideoNode,
} from '@prezly/slate-types';
import type { ComponentType } from 'react';

export type NodeRenderer<T extends Node> = ComponentType<{ node: T }>;

export type TextRenderer = ComponentType<TextNode & { children?: never }>;

export interface ComponentRenderers {
    [ATTACHMENT_NODE_TYPE]?: NodeRenderer<AttachmentNode>;
    [BOOKMARK_NODE_TYPE]?: NodeRenderer<BookmarkNode>;
    [BULLETED_LIST_NODE_TYPE]?: NodeRenderer<ListNode>;
    [CONTACT_NODE_TYPE]?: NodeRenderer<ContactNode>;
    [COVERAGE_NODE_TYPE]?: NodeRenderer<CoverageNode>;
    [DIVIDER_NODE_TYPE]?: NodeRenderer<DividerNode>;
    [DOCUMENT_NODE_TYPE]?: NodeRenderer<DocumentNode>;
    [EMBED_NODE_TYPE]?: NodeRenderer<EmbedNode>;
    [GALLERY_NODE_TYPE]?: NodeRenderer<GalleryNode>;
    [HEADING_1_NODE_TYPE]?: NodeRenderer<HeadingNode>;
    [HEADING_2_NODE_TYPE]?: NodeRenderer<HeadingNode>;
    [IMAGE_NODE_TYPE]?: NodeRenderer<ImageNode>;
    [LINK_NODE_TYPE]?: NodeRenderer<LinkNode>;
    [LIST_ITEM_NODE_TYPE]?: NodeRenderer<ListItemNode>;
    [LIST_ITEM_TEXT_NODE_TYPE]?: NodeRenderer<ListItemTextNode>;
    [MENTION_NODE_TYPE]?: NodeRenderer<MentionNode>;
    [NUMBERED_LIST_NODE_TYPE]?: NodeRenderer<ListNode>;
    [PARAGRAPH_NODE_TYPE]?: NodeRenderer<ParagraphNode>;
    [PLACEHOLDER_NODE_TYPE]?: NodeRenderer<PlaceholderNode>;
    [QUOTE_NODE_TYPE]?: NodeRenderer<QuoteNode>;
    [VIDEO_NODE_TYPE]?: NodeRenderer<VideoNode>;
    text?: TextRenderer;
}

export type Transformation = (node: Node) => Node | null;
