import {
    isAttachmentNode,
    isBookmarkNode,
    isContactNode,
    isDividerNode,
    isDocumentNode,
    isEmbedNode,
    isGalleryNode,
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
import React, {ReactNode} from 'react';
import type { Node } from 'slate';

import * as Elements from './elements';
import { applyTransformations } from './lib';
import * as Transformations from './transformations';
import type { Transformation } from './types';
import { Component, Selector } from './selector';

interface Props {
    children?: ReactNode;
    nodes: Node | Node[];
    transformations?: Transformation[];
}

export function Renderer({ children, nodes, transformations = Object.values(Transformations) }: Props) {
    const transformedNodes = applyTransformations(
        Array.isArray(nodes) ? nodes : [nodes],
        transformations,
    );

    return (
        <Selector nodes={transformedNodes}>
            {children}
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
    );
}

function isAnyNode(_: Node): _ is Node {
    return true;
}
