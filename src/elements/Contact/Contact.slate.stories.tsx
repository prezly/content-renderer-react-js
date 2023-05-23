import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';
import { ContactNode } from '@prezly/story-content-format';

export default {
    title: 'Elements/Contact',
    decorators: [StoryNameDecorator],
    argTypes: {
        layout: {
            options: [ContactNode.Layout.CARD, ContactNode.Layout.SIGNATURE],
            control: 'select',
        },
        show_avatar: {
            control: 'boolean',
        },
    },
} as Meta;

type Story = StoryObj<{ layout: `${ContactNode.Layout}`; show_avatar: boolean }>;

export const PressContact: Story = {
    render: ({ layout, show_avatar }) => (
        <Renderer
            nodes={[
                {
                    type: 'contact',
                    children: [
                        {
                            text: '',
                        },
                    ],
                    uuid: 'f860590b-db97-44de-a59c-12848956b559',
                    reference: 'a456b750-65cb-49da-8f4a-7f53906bce28',
                    contact: {
                        avatar_url: 'https://ucarecdn.com/da3ea88f-ddfe-4593-a6e4-07c9f9467d5e/PhilipCooper.jpg',
                        company: 'TechCrunch',
                        description: 'PR Manager',
                        email: 'phil@techcrunch.com',
                        facebook: 'https://facebook.com/PhilipCooper',
                        mobile: '+1 555 012 751',
                        name: 'Philip Cooper',
                        phone: '+1 555 991 229',
                        twitter: '@PhilipCooper',
                        website: 'https://techcrunch.com/',
                        address: 'Earth',
                    },
                    layout,
                    show_avatar,
                },
            ]}
        />
    ),
    args: {
        layout: ContactNode.Layout.CARD,
        show_avatar: true,
    },
};
