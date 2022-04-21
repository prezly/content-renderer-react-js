import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Quote',
} as Meta;

export const BlockQuote: Story = () => (
    <Renderer
        nodes={{
            type: 'paragraph',
            children: [
                {
                    type: 'block-quote',
                    children: [
                        {
                            text: 'I love how Prezly has been created by people who really understand the needs of PR professionals. Its features and functionality are just right for our business.',
                        },
                    ],
                },
            ],
        }}
        defaultComponents
    />
);

export const Alignment: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'block-quote',
                align: 'center',
                children: [
                    {
                        text: 'Same goes for blockquotes',
                    },
                ],
            },
        ]}
    />
);
