import type { Node } from '@prezly/story-content-format';
import type { ComponentType, ReactNode } from 'react';
import { Children, Fragment, isValidElement } from 'react';

import { Component } from './Component';

export interface ComponentRenderer {
    match: (node: Node) => boolean;
    component: ComponentType<{ node: Node; [extraProp: string]: any }>;

    [extraProp: string]: any;
}

export function invariant(condition: any, message: string): asserts condition {
    if (!condition) throw new Error(message);
}

/**
 * Creates a component renderer config from a React "children" object,
 * which is usually either a `<Component>` element or an array of them.
 * Used internally by `<Selector>` to create a renderer config from its children.
 */
export function createComponentsRenderersFromChildren(children: ReactNode): ComponentRenderer[] {
    const renderers: ComponentRenderer[] = [];

    Children.forEach(children, (element) => {
        if (!isValidElement(element)) {
            // Ignore non-elements. This allows people to more easily
            // inline conditionals in their renderer config.
            return;
        }

        if (element.type === Fragment) {
            // Transparently support React.Fragment and its children.
            renderers.push(...createComponentsRenderersFromChildren(element.props.children));
            return;
        }

        invariant(
            element.type === Component,
            `[${
                typeof element.type === 'string' ? element.type : element.type.name
            }] is not a <Component> component. All component children of <Selector> must be a <Component> or <React.Fragment>`,
        );

        renderers.push(element.props);
    });

    return renderers;
}
