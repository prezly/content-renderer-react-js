import React from 'react';
import isLokiRunning from '@loki/is-loki-running';

import { Renderer } from '../Renderer';
import type { StoryDecoratorArg, ContextDecoratorArg } from './types';

export function StoryNameDecorator<T>(Story: StoryDecoratorArg<T>, context: ContextDecoratorArg<T>) {
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
        </>
    );
}
