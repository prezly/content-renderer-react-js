import { ButtonBlockNode } from '@prezly/story-content-format';
import type { Meta, StoryFn } from '@storybook/react';

import { ContainerDecorator } from '../../dev/ContainerDecorator';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/ButtonBlock',
    decorators: [ContainerDecorator, StoryNameDecorator],
} as Meta;

const TEST_UUID = '3d497238-9bb3-478c-89e0-13dda44977cd';

export const WithOutlineVariant: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.WIDE,
                uuid: TEST_UUID,
                label: 'Outline button',
                variant: ButtonBlockNode.Variant.OUTLINE,
            },
        ]}
    />
);

export const WithDefaultVariant: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.WIDE,
                uuid: TEST_UUID,
                label: 'Default button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithLeftLayout: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.LEFT,
                uuid: TEST_UUID,
                label: 'Left layout button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithRightLayout: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.RIGHT,
                uuid: TEST_UUID,
                label: 'Right layout button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithCenterLayout: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.CENTER,
                uuid: TEST_UUID,
                label: 'Center layout button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithWideLayout: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.WIDE,
                uuid: TEST_UUID,
                label: 'Wide layout button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithoutHref: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: '',
                new_tab: true,
                layout: ButtonBlockNode.Layout.WIDE,
                uuid: TEST_UUID,
                label: 'Without href button',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithCenterLayoutButLongText: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.CENTER,
                uuid: TEST_UUID,
                label: 'Some long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long text',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithWideLayoutButLongText: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.WIDE,
                uuid: TEST_UUID,
                label: 'Some long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long text',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithRightLayoutButLongText: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.RIGHT,
                uuid: TEST_UUID,
                label: 'Some long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long text',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);

export const WithLeftLayoutButLongText: StoryFn = () => (
    <Renderer
        nodes={[
            {
                type: 'button-block',
                href: 'https://prezly.com',
                new_tab: true,
                layout: ButtonBlockNode.Layout.LEFT,
                uuid: TEST_UUID,
                label: 'Some long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long textSome long text',
                variant: ButtonBlockNode.Variant.DEFAULT,
            },
        ]}
    />
);
