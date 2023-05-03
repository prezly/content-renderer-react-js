import type { Meta, Story } from '@storybook/react';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/List',
    decorators: [StoryNameDecorator],
} as Meta;

export const Bullet: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: "It's that time of year when we look back and plan for what comes in 2022. Here's a bit about what we decided to fix before the end of this year:",
                    },
                ],
            },
            {
                type: 'bulleted-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Better overview of your campaign sending status',
                                        bold: true,
                                    },
                                    {
                                        text: " When your campaign needs to be sent to many (and I mean really many, like 500k) contacts, we improved the process from the point you send the campaign to the full report creation. You can see 'Delivering' status and know when to expect the full report to be ready",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Email presentation in Outlook',
                                        bold: true,
                                    },
                                    {
                                        text: ' Because every email application is special, we need to make sure that your emails look equally special in every single one of them. There were some issues with the content alinement when viewing in some versions of Outlook - we fix that! Your content looks good in all email clients \uD83D\uDC8E',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Add embed and add link/bookmark',
                                        bold: true,
                                    },
                                    {
                                        text: " For users that have these features, we improved the code behind them. We're planning to expand both features in a near future - for example, have more options for embedded story cards. Now we're ready to add more power to them soon!",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Unsubscribe from a licence',
                                        bold: true,
                                    },
                                    {
                                        text: " Currently users can unsubscribe from one newsroom at the time. We now support the option to unsubscribe from all communication from that licence. You can also check our new Privacy portal and if it's available for your newsroom - enable it!",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Selecting a time to publish or send in Firefox',
                                        bold: true,
                                    },
                                    {
                                        text: ' This was a browser specific problem that we fixed when users told us about it. ',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const Numbered: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'And a bit about things that are coming soon in 2022 \uD83C\uDF81',
                    },
                ],
            },
            {
                type: 'numbered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: "Introducing a new type of stories - 'Confidential' \uD83D\uDD0D",
                                        bold: true,
                                    },
                                    {
                                        text: " When you need to work on a story that is dealing with a sensitive information, you might need to hide it even from your colleagues. With a new type of a Prezly story called 'Confidential' you'll be able to write your content directly in Prezly with full confidence it'll stay private to you only until you decide to share it with the world.",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'New default Prezly theme',
                                        bold: true,
                                    },
                                    {
                                        text: " It's modern, pretty, and it makes your content look great! The new theme is coming real soon, it'll have all the features you need - cool stories, categories, search, and more! Here's a sneak peek.",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const Nested: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Below you can see complex nested list',
                    },
                ],
            },
            {
                type: 'bulleted-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Account switching is officially here!',
                                        bold: true,
                                    },
                                ],
                            },
                            {
                                type: 'bulleted-list',
                                children: [
                                    {
                                        type: 'list-item',
                                        children: [
                                            {
                                                type: 'list-item-text',
                                                children: [
                                                    {
                                                        text: 'You can now log in to multiple Prezly accounts using your one email and password, and switch between them without having to do the run-of-the-mill work of logging out and back in again.',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: 'list-item',
                                        children: [
                                            {
                                                type: 'list-item-text',
                                                children: [
                                                    {
                                                        text: 'Give it a try!',
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'numbered-list',
                                                children: [
                                                    {
                                                        type: 'list-item',
                                                        children: [
                                                            {
                                                                type: 'list-item-text',
                                                                children: [
                                                                    {
                                                                        text: 'Once you’ve been invited to another account, click on your name or avatar on the top right corner of Prezly (the user menu).',
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: 'list-item',
                                                        children: [
                                                            {
                                                                type: 'list-item-text',
                                                                children: [
                                                                    {
                                                                        text: 'Select the account you would like to work in.',
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        type: 'list-item',
                                                        children: [
                                                            {
                                                                type: 'list-item-text',
                                                                children: [
                                                                    {
                                                                        text: 'When you have switched to another account, you will see a green notification bar confirming that the switch has been made. Simples!',
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: 'list-item',
                                        children: [
                                            {
                                                type: 'list-item-text',
                                                children: [
                                                    {
                                                        type: 'link',
                                                        href: 'https://www.prezly.com/news/introducing-account-switching',
                                                        new_tab: true,
                                                        children: [
                                                            {
                                                                text: 'Read the full write up, where we go into the feature in more detail and cover how this helps Prezly users →',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Nested numeric lists should have different numeration styles:',
                    },
                ],
            },
            {
                type: 'numbered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Top-level items should have numbers',
                                    },
                                ],
                            },
                            {
                                type: 'numbered-list',
                                children: [
                                    {
                                        type: 'list-item',
                                        children: [
                                            {
                                                type: 'list-item-text',
                                                children: [
                                                    {
                                                        text: 'Second-level items should use latin letters',
                                                    },
                                                ],
                                            },
                                            {
                                                type: 'numbered-list',
                                                children: [
                                                    {
                                                        type: 'list-item',
                                                        children: [
                                                            {
                                                                type: 'list-item-text',
                                                                children: [
                                                                    {
                                                                        text: 'Third-level items should use roman numbers',
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                type: 'numbered-list',
                                                                children: [
                                                                    {
                                                                        type: 'list-item',
                                                                        children: [
                                                                            {
                                                                                type: 'list-item-text',
                                                                                children: [
                                                                                    {
                                                                                        text: 'Fourth-level list is using numbers again',
                                                                                    },
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
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
                type: 'bulleted-list',
                align: 'center',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Lists',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Can be centered',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'as well',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 'numbered-list',
                align: 'right',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'Or even',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'aligned',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    {
                                        text: 'to the right',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);

export const WithSpacesBetweenItems: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'bulleted-list',
                children: [
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'Familiar, yet new', bold: true },
                                    {
                                        text: ' - Painting VR is painting evolved; create stunning art by blending age-old techniques with the latest technological advances. There is no "undo" in real life, but there is one in Painting VR!\n',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'A relaxing experience ', bold: true },
                                    {
                                        text: '- By using a combination of visuals, audio & haptics, digital artists will be immersed in a relaxing and satisfying creative experience.\n',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'A wide selection of brushes & tools', bold: true },
                                    {
                                        text: ' - A spray can, brushes, paint rollers, markers, and even a customisable drill fitted with a brush magnet? We have it all!\n',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'Pick or mix paint colours', bold: true },
                                    {
                                        text: ' - Dip your brush in the bucket of your choice, or mix colours to get the desired effect. You can even use the colour picking function to select colours from your canvas, mixing palette or reference images.\n',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'In-game web browser', bold: true },
                                    {
                                        text: ' - Listen to your favourite tunes, watch online tutorials, or get inspired by entering (random) words in the image search engine.\n',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'list-item',
                        children: [
                            {
                                type: 'list-item-text',
                                children: [
                                    { text: 'Make the studio your own', bold: true },
                                    {
                                        text: ' - Find the studio set-up that works best for you and save it for future visits. Put your favourite art on the walls & personalize your workplace. ',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ]}
    />
);
