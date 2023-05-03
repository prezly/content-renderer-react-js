import { StoryBookmarkNode } from '@prezly/story-content-format';
import type { Meta, Story } from '@storybook/react';

import { StoryNameDecorator } from '../../dev/StoryNameDecorator';
import { Renderer } from '../../Renderer';
import * as mock from '../../dev/mocks';
import { Component } from '../../selector';
import { Elements } from '../..';

export default {
    title: 'Elements/StoryBookmark',
    decorators: [StoryNameDecorator],
} as Meta;

export const VerticalWithThumbnail: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical story bookmark with thumbnail',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d70',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.VERTICAL,
                new_tab: false,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmark}
        />
    </Renderer>
);

export const VerticalNewTab: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Story bookmark which opens in new tab',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d70',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.VERTICAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmark}
        />
    </Renderer>
);

export const HorizontalWithThumbnail: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal story bookmark with thumbnail',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d71',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.HORIZONTAL,
                new_tab: false,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmark}
        />
    </Renderer>
);

export const VerticalWithoutThumbnail: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical story bookmark without thumbnail',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d72',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: false,
                layout: StoryBookmarkNode.Layout.VERTICAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmark}
        />
    </Renderer>
);

export const HorizontalWithoutThumbnail: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal story bookmark without thumbnail',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d73',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: false,
                layout: StoryBookmarkNode.Layout.HORIZONTAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmark}
        />
    </Renderer>
);

export const VerticalLongTitleShortDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Vertical Short Title and Long Description:',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d73',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.VERTICAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmarkWithLongTitleAndShortDescription}
        />
    </Renderer>
);

export const VerticalShortTitleLongDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal story bookmark without thumbnail',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d73',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.VERTICAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmarkWithShortTitleAndLongDescription}
        />
    </Renderer>
);

export const HorizontalLongTitleShortDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal Long Title and Short Description:',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d73',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.HORIZONTAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmarkWithLongTitleAndShortDescription}
        />
    </Renderer>
);

export const HorizontalShortTitleLongDescription: Story = () => (
    <Renderer
        nodes={[
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Horizontal Short Title and Long Description:',
                    },
                ],
            },
            {
                type: 'story-bookmark',
                children: [
                    {
                        text: '',
                    },
                ],
                uuid: 'f89e507f-4707-4005-9556-72a4a7e65d73',
                story: {
                    uuid: 'b26212eb-d290-49c5-995b-def2d1218546',
                },
                show_thumbnail: true,
                layout: StoryBookmarkNode.Layout.HORIZONTAL,
                new_tab: true,
            },
        ]}
    >
        <Component
            match={StoryBookmarkNode.isStoryBookmarkNode}
            component={PreFetchedStoryBookmarkWithShortTitleAndLongDescription}
        />
    </Renderer>
);

function PreFetchedStoryBookmark({ node }: { node: StoryBookmarkNode }) {
    return <Elements.StoryBookmark node={node} storyOEmbedInfo={mock.referencedStory.oembed} />;
}

function PreFetchedStoryBookmarkWithLongTitleAndShortDescription({
    node,
}: {
    node: StoryBookmarkNode;
}) {
    return (
        <Elements.StoryBookmark
            node={node}
            storyOEmbedInfo={mock.referencedStoryWithLongTitleAndShortDescription.oembed}
        />
    );
}

function PreFetchedStoryBookmarkWithShortTitleAndLongDescription({
    node,
}: {
    node: StoryBookmarkNode;
}) {
    return (
        <Elements.StoryBookmark
            node={node}
            storyOEmbedInfo={mock.referencedStoryWithShortTitleAndLongDescription.oembed}
        />
    );
}
