import type { Meta, StoryFn } from '@storybook/react';

import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Callout',
} as Meta;

const TEXT = {
    text: 'I love how Prezly has been created by people who really understand the needs of PR professionals. Its features and functionality are just right for our business.',
};

export const Callout: StoryFn = () => (
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

export const CenterAligned: StoryFn = () => (
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
export const RightAligned: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                icon: '❌',
                align: 'right',
                children: [TEXT],
            },
        ]}
    />
);

export const NoIcon: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'callout',
                children: [TEXT],
            },
        ]}
    />
);
