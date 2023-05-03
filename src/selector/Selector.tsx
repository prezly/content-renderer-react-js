import { ComposedElement, type Node } from '@prezly/story-content-format';
import { Fragment, type ReactNode } from 'react';

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
                        children={
                            ComposedElement.isComposedElement(node)
                                ? renderNodes(node.children as Node[])
                                : undefined
                        }
                    />
                );
            }
        }
        return null;
    }

    return <>{Array.isArray(nodes) ? renderNodes(nodes) : renderNode(nodes)}</>;
}
