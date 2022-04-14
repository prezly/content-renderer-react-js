import React from 'react';

import { defaultComponents } from './defaultComponents';
import * as Transformations from './transformations';
import { RendererContextProvider, RendererContextProps } from './RendererContext';

import { ElementsRenderer, ElementsRendererProps } from './ElementsRenderer';

interface Props extends RendererContextProps, ElementsRendererProps {}

export function Renderer({
    nodes,
    components: userComponents = {},
    transformations = Object.values(Transformations),
    elementsContext,
}: Props) {
    const components = { ...defaultComponents, ...userComponents };

    return (
        <RendererContextProvider elementsContext={elementsContext}>
            <ElementsRenderer
                nodes={nodes}
                components={components}
                transformations={transformations}
            />
        </RendererContextProvider>
    );
}
