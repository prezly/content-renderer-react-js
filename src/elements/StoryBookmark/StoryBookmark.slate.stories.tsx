import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { isStoryBookmarkNode, StoryBookmarkNode } from '@prezly/slate-types';
import { Renderer } from '../../Renderer';
import { referencedStory } from '../../dev/mocks';
import { Component } from '../../selector';
import { Elements } from '../..';

export default {
    title: 'Elements/StoryBookmark',
} as Meta;

export const VerticalWithThumbnail: Story = () => (
    <Renderer
        nodes={[
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
                layout: 'vertical',
                new_tab: true,
            },
        ]}
    >
        <Component match={isStoryBookmarkNode} component={PrefetchedStoryBookmark} />
    </Renderer>
);

function PrefetchedStoryBookmark({ node }: { node: StoryBookmarkNode }) {
    return <Elements.StoryBookmark node={node} story={referencedStory} />;
}
