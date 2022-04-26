import React from 'react';
import type { PartialStoryFn, StoryContext } from '@storybook/csf';
import type { ReactFramework } from '@storybook/react';
import isLokiRunning from '@loki/is-loki-running';
import { Renderer } from '../Renderer';

export function StoryNameDecorator<T>(
    Story: PartialStoryFn<ReactFramework, T>,
    context: StoryContext<ReactFramework, T>,
) {
    if (!isLokiRunning()) {
        return <Story />;
    }

    return (
        <>
            <Renderer
                nodes={[
                    {
                        type: 'heading-one',
                        children: [{ text: context.name }],
                    },
                    {
                        type: 'divider',
                        children: [{ text: '' }],
                    },
                ]}
            />
            <Story />
            <Renderer
                nodes={[
                    {
                        type: 'divider',
                        children: [{ text: '' }],
                    },
                ]}
            />
            ,
        </>
    );
}
