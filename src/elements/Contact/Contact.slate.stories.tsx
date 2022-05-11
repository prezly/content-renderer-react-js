import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Contact',
    decorators: [StoryNameDecorator],
} as Meta;

export const PressContacts: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'contact',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'a456b750-65cb-49da-8f4a-7f53906bce28',
                contact: {
                    id: 233967,
                    uuid: 'a456b750-65cb-49da-8f4a-7f53906bce28',
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
                },
            },
        ]}
    />
);
