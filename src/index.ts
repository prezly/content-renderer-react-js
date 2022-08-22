import ResizeObserver from 'resize-observer-polyfill';

export type { Transformation } from './types';

export * as Elements from './elements';
export { stringifyNode } from './lib';
export { Component, Selector } from './selector';
export * as Transformations from './transformations';

export { Renderer } from './Renderer';

if (typeof window !== 'undefined') {
    window.ResizeObserver = window.ResizeObserver ?? ResizeObserver;
}
