import React from 'react';
import type { StoryDecoratorArg } from './types';

export function ContainerDecorator<T>(Story: StoryDecoratorArg<T>) {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <Story />
        </div>
    );
}
