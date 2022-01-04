import { isElementNode, isTextNode, Node } from '@prezly/slate-types';
import React, { Fragment, FunctionComponent } from 'react';

import { defaultComponents } from './defaultComponents';
import { applyTransformations, stringifyNode } from './lib';
import * as Transformations from './transformations';
import type { ComponentRenderers, Transformation } from './types';

interface Props {
    nodes: Node | Node[];
    components?: ComponentRenderers;
    transformations?: Transformation[];
}

export const Renderer: FunctionComponent<Props> = ({
    nodes,
    components: userComponents = {},
    transformations = Object.values(Transformations),
}) => {
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
                    return <TextRenderer key={index} {...node} />;
                }

                if (isElementNode(node)) {
                    const { children, type } = node;
                    const NodeRenderer = components[type as keyof ComponentRenderers];

                    if (NodeRenderer) {
                        return (
                            // @ts-ignore
                            <NodeRenderer key={index} node={node}>
                                {/* @ts-ignore */}
                                <Renderer nodes={children} components={components} />
                            </NodeRenderer>
                        );
                    }
                }

                if (process.env.NODE_ENV === 'development') {
                    console.warn(
                        `[@prezly/content-renderer-react-js] Unknown node type encountered: ${stringifyNode(
                            node,
                        )}`,
                    );
                }

                return <Fragment key={index} />;
            })}
        </>
    );
};
