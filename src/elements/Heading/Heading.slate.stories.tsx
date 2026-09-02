import type { Meta, StoryFn } from '@storybook/react';

import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Heading',
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
