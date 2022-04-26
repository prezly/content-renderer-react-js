import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { ContainerDecorator } from '../../dev/ContainerDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/Image',
    decorators: [ContainerDecorator],
} as Meta;

export const WithCaption: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'image-block',
                href: '',
                file: {
                    version: 2,
                    uuid: 'cb4879f8-d3ad-4a65-b74f-0afa09c913d5',
                    filename: 'pumpkin-6000x4000.JPG',
                    mime_type: 'image/jpeg',
                    size: 13482898,
                    original_width: 6000,
                    original_height: 4000,
                    effects: [],
                },
                layout: 'expanded',
                width: '100%',
                width_factor: '100%',
                children: [
                    {
                        text: 'The software is incredibly user friendly and intuitive. The Prezly team is really quick and always available, which was a huge help during my onboarding. The ability to manage and update contacts, develop content and issue press releases all on one platform is great. This is truly an all-in-one, streamlined PR solution.',
                    },
                ],
            },
        ]}
    />
);

export const Width100: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'image-block',
                href: '',
                file: {
                    version: 2,
                    uuid: 'd0bdf122-a96a-425b-93e8-e3f1a052d413',
                    filename: 'dog-300x300.jpeg',
                    mime_type: 'image/jpeg',
                    size: 30264,
                    original_width: 300,
                    original_height: 300,
                    effects: [],
                },
                layout: 'contained',
                width: '100%',
                width_factor: '100%',
                children: [
                    {
                        text: 'Contained 100% width',
                    },
                ],
            },
            {
                type: 'image-block',
                href: '',
                file: {
                    version: 2,
                    uuid: '90a308d7-411c-459f-8772-f83de2dae1db',
                    filename: 'vertical-1024x2968.jpg',
                    mime_type: 'image/jpeg',
                    size: 671971,
                    original_width: 1024,
                    original_height: 2968,
                    effects: [],
                },
                layout: 'contained',
                width: '100%',
                width_factor: '100%',
                children: [
                    {
                        text: 'Contained 100% width',
                    },
                ],
            },
        ]}
    />
);

export const Width45: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'image-block',
                href: '',
                file: {
                    version: 2,
                    uuid: 'da42f9f4-6bc2-4b42-8c8e-04a0d0db9aee',
                    filename: 'cat-1200x1199.jpg',
                    mime_type: 'image/jpeg',
                    size: 156145,
                    original_width: 1200,
                    original_height: 1199,
                    effects: [],
                },
                layout: 'contained',
                width: '45%',
                width_factor: '100%',
                children: [
                    {
                        text: 'Contained 45% width',
                    },
                ],
            },
        ]}
    />
);

export const FullWidth: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'image-block',
                href: 'https://rock.prezly.com',
                file: {
                    version: 2,
                    uuid: '52a78e73-cea4-43d5-91a3-fd9182160f5b',
                    filename: 'merttalayKYZoOmpn1Awunsplash.jpg',
                    mime_type: 'image/jpeg',
                    size: 1762479,
                    original_width: 3994,
                    original_height: 2246,
                    effects: ['/crop/3994x1359/0,454/'],
                },
                layout: 'full-width',
                width: '100%',
                width_factor: '100%',
                children: [
                    {
                        text: 'Full width image with a caption and a link',
                    },
                ],
            },
        ]}
    />
);
