import type { Node } from 'slate';
import type { ComponentType, ReactNode } from 'react';
import { invariant } from './lib';

interface ComponentProps<T> {
    node: T;
    renderChildren: (nodes: Node[]) => ReactNode;
}

type Props<T extends Node, P extends object = {}> = P & {
    match: (node: Node) => node is T;
    component: ComponentType<P & ComponentProps<T>>;
};

export function Component<T extends Node, P extends object = {}>(_: Props<T, P>) {
    invariant(
        false,
        `A <Component> is only ever to be used as the child of <Selector> element, ` +
            `never rendered directly. Please wrap your <Component> in a <Selector>.`,
    );
}
