import type { Node } from 'slate';
import type { ReactNode } from 'react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ComponentRenderer, createComponentsRenderersFromChildren } from './lib';
import { Element } from 'slate';

interface Props {
    nodes: Node | Node[];
    children: ReactNode;
}

export function Selector(props: Props) {
    const renderers = useStableRenderers(createComponentsRenderersFromChildren(props.children));

    const render = useCallback(
        function (nodes: Node | Node[]): ReactNode {
            function renderNodes(nodes: Node[]): ReactNode {
                return nodes.map((node, idx) => <Fragment key={idx}>{renderNode(node)}</Fragment>);
            }

            function renderNode(node: Node) {
                for (const { match, component: ComponentRenderer, ...extraProps } of renderers) {
                    if (match(node)) {
                        return (
                            <ComponentRenderer
                                {...extraProps}
                                node={node}
                                children={
                                    Element.isElement(node) ? renderNodes(node.children) : undefined
                                }
                            />
                        );
                    }
                }
                return null;
            }

            return Array.isArray(nodes) ? renderNodes(nodes) : renderNode(nodes);
        },
        [renderers],
    );

    return <>{render(props.nodes)}</>;
}

function useStableRenderers(renderers: ComponentRenderer[]) {
    const [prevRenderers, setPrevRenderers] = useState<ComponentRenderer[]>(renderers);

    useEffect(
        function () {
            if (!isRendererArrayEqual(prevRenderers, renderers)) {
                setPrevRenderers(renderers);
            }
        },
        [renderers],
    );

    return prevRenderers;
}

function isRendererArrayEqual(a: ComponentRenderer[], b: ComponentRenderer[]): boolean {
    return a.length === b.length && a.every((_, i) => isRendererEqual(a[i], b[i]));
}

function isRendererEqual(a: ComponentRenderer, b: ComponentRenderer): boolean {
    return (
        a.match === b.match &&
        a.component === b.component &&
        JSON.stringify(a.extraProps) === JSON.stringify(b.extraProps)
    );
}
