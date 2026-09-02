import type { Meta, StoryFn } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Divider',
    decorators: [StoryNameDecorator],
} as Meta;

export const Divider: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                align: 'center',
                children: [
                    {
                        text: 'Content before divider',
                    },
                ],
            },
            {
                type: 'divider',
                children: [
                    {
                        text: '',
                    },
                ],
            },
            {
                type: 'paragraph',
                align: 'center',
                children: [
                    {
                        text: 'Content after divider',
                    },
                ],
            },
        ]}
    />
);
