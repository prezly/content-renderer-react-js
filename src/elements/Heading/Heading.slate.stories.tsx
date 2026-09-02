import type { Meta, StoryFn } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Heading',
    decorators: [StoryNameDecorator],
} as Meta;

export const Alignment: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'heading-one',
                align: 'center',
                children: [
                    {
                        text: 'Headings can be centered too',
                    },
                ],
            },
            {
                type: 'heading-two',
                align: 'right',
                children: [
                    {
                        text: '... or right-aligned!',
                    },
                ],
            },
        ]}
    />
);
