import type { Node } from '@prezly/story-content-format';
import {
    AttachmentNode,
    BookmarkNode,
    ButtonBlockNode,
    CalloutNode,
    ContactNode,
    DividerNode,
    DocumentNode,
    EmbedNode,
    GalleryNode,
    HeadingNode,
    HtmlNode,
    ImageNode,
    LinkNode,
    ListItemNode,
    ListItemTextNode,
    ListNode,
    ParagraphNode,
    PlaceholderNode,
    QuoteNode,
    TableCellNode,
    TableNode,
    TableRowNode,
    Text,
    VariableNode,
    VideoNode,
} from '@prezly/story-content-format';
import type { ComponentType, ReactNode } from 'react';

import * as Elements from './elements';
import { applyTransformations } from './lib';
import { Component, Selector } from './selector';
import * as Transformations from './transformations';
import type { Transformation } from './types';

type Fallback = 'ignore' | 'warning' | 'passthru' | ComponentType<{ node: Node }>;

interface Props<N extends Node | Node[]> {
    children?: ReactNode;
    defaultComponents?: boolean;
    defaultFallback?: Fallback;
    nodes: N;
    transformations?: Transformation[];
}

export function Renderer<N extends Node | Node[]>({
    children,
    defaultComponents = true,
    defaultFallback = 'warning',
    nodes,
    transformations = Object.values(Transformations),
}: Props<N>) {
    const transformedNodes = applyTransformations<Node>(
        Array.isArray(nodes) ? nodes : [nodes],
        transformations,
    );

    return (
        <Selector nodes={transformedNodes}>
            {children}
            {defaultComponents && (
                <>
                    <Component
                        match={AttachmentNode.isAttachmentNode}
                        component={Elements.Attachment}
                    />
                    <Component
                        match={ButtonBlockNode.isButtonBlockNode}
                        component={Elements.ButtonBlock}
                    />
                    <Component match={BookmarkNode.isBookmarkNode} component={Elements.Bookmark} />
                    <Component match={CalloutNode.isCalloutNode} component={Elements.Callout} />
                    <Component match={ContactNode.isContactNode} component={Elements.Contact} />
                    <Component match={DividerNode.isDividerNode} component={Elements.Divider} />
                    <Component match={DocumentNode.isDocumentNode} component={Elements.Document} />
                    <Component match={EmbedNode.isEmbedNode} component={Elements.Embed} />
                    <Component match={GalleryNode.isGalleryNode} component={Elements.Gallery} />
                    <Component match={HeadingNode.isHeadingNode} component={Elements.Heading} />
                    <Component match={HtmlNode.isHtmlNode} component={Elements.Html} />
                    <Component match={ImageNode.isImageNode} component={Elements.Image} />
                    <Component match={LinkNode.isLinkNode} component={Elements.Link} />
                    <Component match={ListNode.isListNode} component={Elements.List} />
                    <Component match={ListItemNode.isListItemNode} component={Elements.ListItem} />
                    <Component
                        match={ListItemTextNode.isListItemTextNode}
                        component={Elements.ListItemText}
                    />
                    <Component
                        match={ParagraphNode.isParagraphNode}
                        component={Elements.Paragraph}
                    />
                    <Component
                        match={PlaceholderNode.isPlaceholderNode}
                        component={Elements.Ignore}
                    />
                    <Component match={QuoteNode.isQuoteNode} component={Elements.Quote} />
                    <Component match={Text.isText} component={Elements.Text} />
                    <Component match={VariableNode.isVariableNode} component={Elements.Variable} />
                    <Component match={VideoNode.isVideoNode} component={Elements.Video} />
                    <Component match={TableNode.isTableNode} component={Elements.Table} />
                    <Component match={TableRowNode.isTableRowNode} component={Elements.TableRow} />
                    <Component
                        match={TableCellNode.isTableCellNode}
                        component={Elements.TableCell}
                    />
                </>
            )}
            <Component match={isAnyNode} component={fallback(defaultFallback)} />
        </Selector>
    );
}

function fallback(defaultFallback: Fallback): ComponentType<{ node: Node }> {
    if (defaultFallback === 'ignore') return Elements.Ignore;
    if (defaultFallback === 'passthru') return Elements.Passthru;
    if (defaultFallback === 'warning') return Elements.Unknown;
    return defaultFallback;
}

function isAnyNode(_: Node): _ is Node {
    return true;
}
