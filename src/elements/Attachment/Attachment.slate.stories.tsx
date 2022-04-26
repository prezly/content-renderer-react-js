import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Attachment',
    decorators: [StoryNameDecorator],
} as Meta;

export const File: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'heading-two',
                children: [
                    {
                        text: 'File attachment',
                    },
                ],
            },
            {
                type: 'attachment',
                children: [
                    {
                        text: '',
                    },
                ],
                description: 'example',
                file: {
                    version: 2,
                    uuid: '8b4308af-6e4b-450e-aaee-34a39f35556b',
                    filename: 'example.pdf',
                    mime_type: 'application/pdf',
                    size: 433994,
                },
            },
        ]}
    />
);
