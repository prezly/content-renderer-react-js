import type { ReactNode } from 'react';
import React, { Fragment } from 'react';
import type { Node } from 'slate';
import { Element } from 'slate';

import { createComponentsRenderersFromChildren } from './lib';

interface Props {
    nodes: Node | Node[];
    children: ReactNode;
}

export function Selector({ nodes, children }: Props) {
    const renderers = createComponentsRenderersFromChildren(children);

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
                        children={Element.isElement(node) ? renderNodes(node.children) : undefined}
                    />
                );
            }
        }
        return null;
    }

    return <>{Array.isArray(nodes) ? renderNodes(nodes) : renderNode(nodes)}</>;
}
