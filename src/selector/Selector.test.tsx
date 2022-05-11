import { DividerNode, DocumentNode, HeadingNode } from '@prezly/story-content-format';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';

import { Component } from './Component';
import { Selector } from './Selector';
import { Divider, Document, Heading } from '../elements';

const documentNode: DocumentNode = {
    type: DocumentNode.TYPE,
    version: '0.50',
    children: [
        {
            type: HeadingNode.Type.HEADING_ONE,
            children: [{ text: 'Hello world!' }],
        },
        {
            type: DividerNode.TYPE,
        },
    ],
};

describe('Renderer', () => {
    it('Renders a <h1> for a heading and a <section> for a divider', () => {
        const asString = ReactDOMServer.renderToString(
            <Selector nodes={documentNode}>
                <Component match={DividerNode.isDividerNode} component={Divider} />
                <Component match={HeadingNode.isHeadingNode} component={Heading} />
                <Component match={DocumentNode.isDocumentNode} component={Document} />
            </Selector>,
        );

        expect(asString).toContain('<h1');
        expect(asString).toContain('<section');
    });
});
