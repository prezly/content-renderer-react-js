import { TableNode } from '@prezly/story-content-format';
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Table',
    decorators: [StoryNameDecorator],
} as Meta;

export const NoBorder: Story = () => <Renderer nodes={[createTableNode({})]} />;

export const WithBorder: Story = () => <Renderer nodes={[createTableNode({ border: true })]} />;

export const WithRowHeader: Story = () => (
    <Renderer
        nodes={[createTableNode({ border: true, header: [TableNode.TableHeader.FIRST_ROW] })]}
    />
);

export const WithColumnHeader: Story = () => (
    <Renderer
        nodes={[createTableNode({ border: true, header: [TableNode.TableHeader.FIRST_COLUMN] })]}
    />
);

function createTableNode(props: Omit<TableNode, 'children' | 'type'>): TableNode {
    return {
        type: 'table',
        ...props,
        children: [
            {
                type: 'table-row',
                children: [
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '1',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '2',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '3',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'table-row',
                children: [
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '4',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '5',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '6',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'table-row',
                children: [
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '7',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '8',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'table-cell',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: '9',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
