import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Paragraph',
} as Meta;

export const RegularParagraphOfText: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: "Prezly is a very user-friendly system. Uploading lists that you have made over the years, making attractive press files, selecting and contacting journalists, the system does it all. It's quick, it's updated regularly, the help desk is swift and friendly if ever you need them.",
                    },
                ],
            },
        ]}
    />
);

export const WhitespaceCollapsing: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'This paragraph   has       additional    whitespaces    between   words, which are   expected to be    preserved.',
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: 'The next paragraph has no inner text, but it is expected to still occupy the vertical space, as normally:',
                            },
                        ],
                    },
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const SoftLineBreaks: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: 'There is a soft-line break after this text:\nthis should appear on the next line',
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const Placeholders: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: 'Publication date placeholder: ',
                            },
                            {
                                type: 'placeholder',
                                children: [
                                    {
                                        text: '',
                                    },
                                ],
                                key: 'publication.date',
                            },
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const StyledText: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'paragraph',
                        children: [
                            {
                                text: 'Paragraph with ',
                            },
                            {
                                text: 'bold',
                                bold: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'underline',
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'italics',
                                italic: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'superscript',
                                superscript: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'subscript',
                                subscript: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'bold underline',
                                bold: true,
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'bold italics',
                                bold: true,
                                italic: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'underline italics',
                                italic: true,
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'bold underline italics',
                                bold: true,
                                italic: true,
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'bold underline italics superscript',
                                bold: true,
                                italic: true,
                                superscript: true,
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                text: 'bold underline italics subscript',
                                bold: true,
                                italic: true,
                                subscript: true,
                                underlined: true,
                            },
                            {
                                text: ', ',
                            },
                            {
                                type: 'link',
                                href: 'https://rock.prezly.com',
                                children: [
                                    {
                                        text: 'link',
                                    },
                                ],
                            },
                            {
                                text: ', ',
                            },
                            {
                                type: 'link',
                                href: 'https://rock.prezly.com',
                                children: [
                                    {
                                        text: 'bold underline italics link',
                                        bold: true,
                                        italic: true,
                                        underlined: true,
                                    },
                                ],
                            },
                            {
                                text: '.',
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const Alignment: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                align: 'center',
                children: [
                    {
                        text: 'Top-level text blocks can be centered now',
                    },
                ],
            },
            {
                type: 'paragraph',
                align: 'right',
                children: [
                    {
                        text: '... or aligned to right',
                    },
                ],
            },
        ]}
    />
);
