import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { importAll } from '../dev/importAll';
import { Renderer } from '../Renderer';

export default {
    title: 'AllElements',
} as Meta;

export const AllElements: Story = () => {
    const storiesModules = importAll(require.context('./', true, /\.slate.stories.tsx$/));

    const children: JSX.Element[] = [];

    storiesModules.forEach((module) => {
        children.push(
            <Renderer
                nodes={{
                    type: 'heading-one',
                    children: [{ text: module.default.title }],
                }}
                defaultComponents
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
                        defaultComponents
                    />,
                );
                children.push(<Story />);
            }
        });
    });

    return <>{children}</>;
};
