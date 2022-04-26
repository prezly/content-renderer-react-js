import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { ContainerDecorator } from '../../dev/ContainerDecorator';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Gallery',
    decorators: [ContainerDecorator, StoryNameDecorator],
} as Meta;

export const ContainedSmallPadding: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Contained gallery with small paddings and small images:',
                    },
                ],
            },
            {
                type: 'gallery',
                children: [
                    {
                        text: '',
                    },
                ],
                images: [
                    {
                        caption: '',
                        file: {
                            version: 2,
                            uuid: '9fba656c-9203-4e8a-8b69-e0a2e9e622e0',
                            filename: 'vertical-1024x2968.jpg',
                            mime_type: 'image/jpeg',
                            size: 671971,
                            original_width: 1024,
                            original_height: 2968,
                            effects: [],
                        },
                    },
                    {
                        caption: 'dog-300x300',
                        file: {
                            version: 2,
                            uuid: '4cc29f43-6cb6-4138-a832-f855cf7a403c',
                            filename: 'dog-300x300.jpeg',
                            mime_type: 'image/jpeg',
                            size: 30264,
                            original_width: 300,
                            original_height: 300,
                            effects: [],
                        },
                    },
                    {
                        caption: 'landscape-870x260',
                        file: {
                            version: 2,
                            uuid: 'dac5a11b-300f-459e-900a-8bb1ee64abae',
                            filename: 'landscape-870x260.jpg',
                            mime_type: 'image/jpeg',
                            size: 46101,
                            original_width: 870,
                            original_height: 260,
                            effects: [],
                        },
                    },
                    {
                        caption: 'cat-1200x1199',
                        file: {
                            version: 2,
                            uuid: '432bdfeb-a3b5-4c66-9979-c5f2411ba5f7',
                            filename: 'cat-1200x1199.jpg',
                            mime_type: 'image/jpeg',
                            size: 156145,
                            original_width: 1200,
                            original_height: 1199,
                            effects: [],
                        },
                    },
                ],
                uuid: '3609bcf7-551f-4644-83e3-8edfad3f5a5b',
                layout: 'contained',
                padding: 'S',
                thumbnail_size: 'S',
            },
        ]}
    />
);

export const Expanded: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Expanded gallery with medium paddings and medium images:',
                    },
                ],
            },
            {
                type: 'gallery',
                children: [
                    {
                        text: '',
                    },
                ],
                images: [
                    {
                        caption: 'cat-1200x1199',
                        file: {
                            version: 2,
                            uuid: '432bdfeb-a3b5-4c66-9979-c5f2411ba5f7',
                            filename: 'cat-1200x1199.jpg',
                            mime_type: 'image/jpeg',
                            size: 156145,
                            original_width: 1200,
                            original_height: 1199,
                            effects: [],
                        },
                    },
                    {
                        caption: '',
                        file: {
                            version: 2,
                            uuid: '9fba656c-9203-4e8a-8b69-e0a2e9e622e0',
                            filename: 'vertical-1024x2968.jpg',
                            mime_type: 'image/jpeg',
                            size: 671971,
                            original_width: 1024,
                            original_height: 2968,
                            effects: [],
                        },
                    },
                    {
                        caption: 'dog-300x300',
                        file: {
                            version: 2,
                            uuid: '4cc29f43-6cb6-4138-a832-f855cf7a403c',
                            filename: 'dog-300x300.jpeg',
                            mime_type: 'image/jpeg',
                            size: 30264,
                            original_width: 300,
                            original_height: 300,
                            effects: [],
                        },
                    },
                    {
                        caption: 'landscape-870x260',
                        file: {
                            version: 2,
                            uuid: 'dac5a11b-300f-459e-900a-8bb1ee64abae',
                            filename: 'landscape-870x260.jpg',
                            mime_type: 'image/jpeg',
                            size: 46101,
                            original_width: 870,
                            original_height: 260,
                            effects: [],
                        },
                    },
                ],
                uuid: '3609bcf7-551f-4644-83e3-8edfad3f5a5b',
                layout: 'expanded',
                padding: 'M',
                thumbnail_size: 'M',
            },
        ]}
    />
);

export const FullWidth: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Full width gallery with large paddings and small images:',
                    },
                ],
            },
            {
                type: 'gallery',
                children: [
                    {
                        text: '',
                    },
                ],
                images: [
                    {
                        caption: '',
                        file: {
                            version: 2,
                            uuid: '9fba656c-9203-4e8a-8b69-e0a2e9e622e0',
                            filename: 'vertical-1024x2968.jpg',
                            mime_type: 'image/jpeg',
                            size: 671971,
                            original_width: 1024,
                            original_height: 2968,
                            effects: [],
                        },
                    },
                    {
                        caption: 'dog-300x300',
                        file: {
                            version: 2,
                            uuid: '4cc29f43-6cb6-4138-a832-f855cf7a403c',
                            filename: 'dog-300x300.jpeg',
                            mime_type: 'image/jpeg',
                            size: 30264,
                            original_width: 300,
                            original_height: 300,
                            effects: [],
                        },
                    },
                    {
                        caption: 'landscape-870x260',
                        file: {
                            version: 2,
                            uuid: 'dac5a11b-300f-459e-900a-8bb1ee64abae',
                            filename: 'landscape-870x260.jpg',
                            mime_type: 'image/jpeg',
                            size: 46101,
                            original_width: 870,
                            original_height: 260,
                            effects: [],
                        },
                    },
                    {
                        caption: 'cat-1200x1199',
                        file: {
                            version: 2,
                            uuid: '432bdfeb-a3b5-4c66-9979-c5f2411ba5f7',
                            filename: 'cat-1200x1199.jpg',
                            mime_type: 'image/jpeg',
                            size: 156145,
                            original_width: 1200,
                            original_height: 1199,
                            effects: [],
                        },
                    },
                ],
                uuid: '3609bcf7-551f-4644-83e3-8edfad3f5a5b',
                layout: 'full-width',
                padding: 'L',
                thumbnail_size: 'S',
            },
        ]}
    />
);
