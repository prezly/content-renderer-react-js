import type { Node } from '@prezly/story-content-format';
import type { ComponentType } from 'react';

import { invariant } from './lib';

type Props<T extends Node, P extends object> = {
    match: (node: Node) => node is T;
    component: ComponentType<{ node: T } & Omit<P, 'node'>>;
};

export function Component<T extends Node, P extends { node?: never }>(_: Props<T, P> & P) {
    invariant(
        false,
        `A <Component> is only ever to be used as the child of <Selector> element, ` +
            `never rendered directly. Please wrap your <Component> in a <Selector>.`,
    );
    return null;
}
