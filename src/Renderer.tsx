import { isElementNode, isTextNode, Node } from '@prezly/slate-types';
import React, { Fragment } from 'react';

import { defaultComponents } from './defaultComponents';
import { applyTransformations, describeNode } from './lib';
import * as Transformations from './transformations';
import type { ComponentRenderers, Transformation } from './types';

interface Props {
    nodes: Node | Node[];
    components?: ComponentRenderers;
    transformations?: Transformation[];
}

export function Renderer({
    nodes,
    components: userComponents = {},
    transformations = Object.values(Transformations),
}: Props) {
    const components = { ...defaultComponents, ...userComponents };
    const transformedNodes = applyTransformations(
        Array.isArray(nodes) ? nodes : [nodes],
        transformations,
    );

    return (
        <>
            {transformedNodes.map((node, index) => {
                if (isTextNode(node)) {
                    const TextRenderer = components.text;
                    return <TextRenderer key={index} node={node} />;
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    const ComponentRenderer = components[type as keyof ComponentRenderers];

                    if (ComponentRenderer) {
                        return (
                            /* @ts-ignore */
                            <ComponentRenderer key={index} node={node}>
                                {/* @ts-ignore */}
                                <Renderer
                                    nodes={children as Node[]}
                                    components={components}
                                    transformations={transformations}
                                />
                            </ComponentRenderer>
                        );
                    }
                }

                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        `[@prezly/content-renderer-react-js] Unknown node type encountered: ${describeNode(
                            node,
                        )}`,
                    );
                }

                return <Fragment key={index} />;
            })}
        </>
    );
}
