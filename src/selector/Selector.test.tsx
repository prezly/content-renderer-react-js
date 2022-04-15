import {
    DIVIDER_NODE_TYPE,
    DOCUMENT_NODE_TYPE,
    DocumentNode,
    ElementNode,
    HEADING_1_NODE_TYPE,
    isDividerNode,
    isDocumentNode,
} from '@prezly/slate-types';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';

import { Component } from './Component';
import { Selector } from './Selector';
import { Divider, Document } from '../elements';

const documentNode: DocumentNode = {
    children: [
        {
            children: [{ text: 'Hello world!' }],
            type: HEADING_1_NODE_TYPE,
        } as ElementNode,
        {
            children: [{ text: '' }],
            type: DIVIDER_NODE_TYPE,
        } as ElementNode,
    ],
    type: DOCUMENT_NODE_TYPE,
    version: '0.50',
};

describe('Renderer', () => {
    it('Renders a <h1> for a heading and a <section> for a divider', () => {
        const asString = ReactDOMServer.renderToString(
            <Selector nodes={documentNode}>
                <Component match={isDividerNode} component={Divider} />
                <Component match={isDocumentNode} component={Document} />
            </Selector>,
        );

        expect(asString).toContain('<h1');
        expect(asString).toContain('<section');
    });
});