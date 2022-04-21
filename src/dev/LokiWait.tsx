import React from 'react';
import type { PartialStoryFn } from '@storybook/csf';
import type { ReactFramework } from '@storybook/react';
import createAsyncCallback from '@loki/create-async-callback';

export function LokiWait<T>(Story: PartialStoryFn<ReactFramework, T>) {
    const cb = () => createAsyncCallback();

    setTimeout(() => {
        cb();
    }, 3000);

    return <Story />;
}
