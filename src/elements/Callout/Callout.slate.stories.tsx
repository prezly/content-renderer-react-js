import type { Meta, Story } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Quote',
    decorators: [StoryNameDecorator],
} as Meta;

const TEXT = {
    text: 'I love how Prezly has been created by people who really understand the needs of PR professionals. Its features and functionality are just right for our business.',
};

export const Callout: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                icon: '💡',
                children: [TEXT],
            },
        ]}
    />
);

export const CenterAligned: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                icon: '⚠️',
                align: 'center',
                children: [TEXT],
            },
        ]}
    />
);
export const RightAligned: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                icon: '❌',
                align: 'center',
                children: [TEXT],
            },
        ]}
    />
);

export const NoIcon: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                children: [TEXT],
            },
        ]}
    />
);
