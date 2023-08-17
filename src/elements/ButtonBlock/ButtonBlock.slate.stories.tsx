import { ButtonBlockNode } from '@prezly/story-content-format';
import type { Meta, Story } from '@storybook/react';

import { ContainerDecorator } from '../../dev/ContainerDecorator';
import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';

export default {
    title: 'Elements/ButtonBlock',
    decorators: [ContainerDecorator, StoryNameDecorator],
} as Meta;

const TEST_UUID = '3d497238-9bb3-478c-89e0-13dda44977cd';

export const WithOutlineVariant: Story = () => (
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

export const WithDefaultVariant: Story = () => (
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

export const WithLeftLayout: Story = () => (
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

export const WithRightLayout: Story = () => (
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

export const WithCenterLayout: Story = () => (
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

export const WithWideLayout: Story = () => (
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

export const WithoutHref: Story = () => (
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

export const WithCenterLayoutButLongText: Story = () => (
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

export const WithWideLayoutButLongText: Story = () => (
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

export const WithRightLayoutButLongText: Story = () => (
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

export const WithWideLeftButLongText: Story = () => (
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
