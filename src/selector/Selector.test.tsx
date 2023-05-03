import { DividerNode, DocumentNode, HeadingNode } from '@prezly/story-content-format';
import renderer from 'react-test-renderer';

import { Divider, Document, Heading } from '../elements';

import { Component } from './Component';
import { Selector } from './Selector';

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

describe('Selector', () => {
    it('should render <h1> for a heading and <hr> for a divider', () => {
        const tree = renderer
            .create(
                <Selector nodes={documentNode}>
                    <Component match={DividerNode.isDividerNode} component={Divider} />
                    <Component match={HeadingNode.isHeadingNode} component={Heading} />
                    <Component match={DocumentNode.isDocumentNode} component={Document} />
                </Selector>,
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
