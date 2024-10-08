import type { CoverageEntry } from '@prezly/sdk';
import type { Node } from '@prezly/story-content-format';
import {
    AttachmentNode,
    BookmarkNode,
    ButtonBlockNode,
    CalloutNode,
    ContactNode,
    CoverageNode,
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
    coverageEntries?: Record<number, CoverageEntry>;
    defaultComponents?: boolean;
    defaultFallback?: Fallback;
    nodes: N;
    renderDate?: (date: string) => ReactNode;
    transformations?: Transformation[];
}

interface RenderProps<T extends Node> {
    children?: ReactNode;
    node: T;
}

export function Renderer<N extends Node | Node[]>({
    children,
    coverageEntries = {},
    defaultComponents = true,
    defaultFallback = 'warning',
    nodes,
    renderDate = defaultRenderDate,
    transformations = Object.values(Transformations),
}: Props<N>) {
    const transformedNodes = applyTransformations<Node>(
        Array.isArray(nodes) ? nodes : [nodes],
        transformations,
    );

    function renderCoverageNode(props: RenderProps<CoverageNode>) {
        const coverage: CoverageEntry | undefined = coverageEntries[props.node.coverage.id];
        return <Elements.Coverage coverage={coverage} node={props.node} renderDate={renderDate} />;
    }

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
                    <Component match={CoverageNode.isCoverageNode} component={renderCoverageNode} />
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
                    <Component match={isTableCellNode} component={Elements.TableCell} />
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

function defaultRenderDate(date: string) {
    return new Date(date).toLocaleDateString();
}

function isAnyNode(_: Node): _ is Node {
    return true;
}

function isTableCellNode(node: any): node is Elements.TableCell.Node {
    return TableCellNode.isTableCellNode(node);
}
