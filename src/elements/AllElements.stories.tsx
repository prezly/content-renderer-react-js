import React from 'react';
import type { Meta, Story } from '@storybook/react';
import createAsyncCallback from '@loki/create-async-callback';
import { importAll } from '../dev/importAll';
import { Renderer } from '../Renderer';

export default {
    title: 'AllElements',
} as Meta;

export const AllElements: Story = () => {
    const cb = createAsyncCallback();

    setTimeout(() => {
        cb();
    }, 1000);

    const storiesModules = importAll(require.context('./', true, /\.slate.stories.tsx$/));

    const children: JSX.Element[] = [];

    storiesModules.forEach((module) => {
        children.push(
            <Renderer
                nodes={[
                    {
                        type: 'heading-one',
                        children: [{ text: module.default.title }],
                    },
                ]}
            />,
        );

        Object.keys(module).forEach((key) => {
            const Story = module[key];

            if (typeof Story === 'function') {
                children.push(
                    <Renderer
                        nodes={{
                            type: 'heading-two',
                            children: [{ text: key.replace(/([A-Z])/g, ' $1') }],
                        }}
                    />,
                );

                children.push(<Story />);
            }
        });

        children.push(
            <Renderer
                nodes={[
                    {
                        type: 'divider',
                        children: [
                            {
                                text: '',
                            },
                        ],
                    },
                ]}
            />,
        );
    });

    return <>{children}</>;
};
