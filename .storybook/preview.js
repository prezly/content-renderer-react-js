import React, { StrictMode } from 'react';
import { importAll } from '../src/dev/importAll';

importAll(require.context('../src', true, /\.scss$/));

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*',
        controls: {
            expanded: true,
        },
    },
};

export const decorators = [
    (Story) => (
        <StrictMode>
            <Story />
        </StrictMode>
    ),
];
