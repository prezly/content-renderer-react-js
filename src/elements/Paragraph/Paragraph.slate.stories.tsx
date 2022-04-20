import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { Renderer } from '../../Renderer';
import story from '../../../sandbox/story.json';

export const Base: Story = () => {
    return <Renderer nodes={story.children} defaultFallback="warning"></Renderer>;
};

export default {
    title: 'Elements/Paragraph',
} as Meta;
