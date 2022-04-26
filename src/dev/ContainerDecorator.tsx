import React from 'react';
import type { PartialStoryFn } from '@storybook/csf';
import type { ReactFramework } from '@storybook/react';

export function ContainerDecorator<T>(Story: PartialStoryFn<ReactFramework, T>) {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <Story />
        </div>
    );
}
