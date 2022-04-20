import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Paragraph',
} as Meta;

export const RegularParagraphOfText: Story = () => {
    return (
        <Renderer
            nodes={{
                type: 'paragraph',
                children: [
                    {
                        text: "Prezly is a very user-friendly system. Uploading lists that you have made over the years, making attractive press files, selecting and contacting journalists, the system does it all. It's quick, it's updated regularly, the help desk is swift and friendly if ever you need them.",
                    },
                ],
            }}
            defaultComponents
        />
    );
};

export const WhitespaceCollapsing: Story = () => {
    return (
        <Renderer
            nodes={{
                type: 'paragraph',
                children: [
                    {
                        text: 'This paragraph   has       additional    whitespaces    between   words, which are   expected to be    preserved.',
                    },
                ],
            }}
            defaultComponents
        />
    );
};
