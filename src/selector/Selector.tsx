import { ComposedElement, type Node } from '@prezly/story-content-format';
import { Fragment, type ReactNode } from 'react';

import { createComponentsRenderersFromChildren } from './lib';

interface Props {
    nodes: Node | Node[];
    children: ReactNode;
}

export function Selector({ nodes: rootNodes, children }: Props) {
    const renderers = createComponentsRenderersFromChildren(children);

    function renderNodes(nodes: Node[]): ReactNode {
        return nodes.map((node, index) => <Fragment key={index}>{renderNode(node)}</Fragment>);
    }

    function renderNode(node: Node) {
        for (const { match, component: ComponentRenderer, ...extraProps } of renderers) {
            if (match(node)) {
                return (
                    <ComponentRenderer
                        {...extraProps}
                        node={node}
                        // eslint-disable-next-line react/no-children-prop
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

    return <>{Array.isArray(rootNodes) ? renderNodes(rootNodes) : renderNode(rootNodes)}</>;
}
