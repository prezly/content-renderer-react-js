import ResizeObserver from 'resize-observer-polyfill';

export * as Elements from './elements';
export { stringifyNode } from './lib';
export { Renderer } from './Renderer';
export { Component, Selector } from './selector';
export * as Transformations from './transformations';
export type { Transformation } from './types';

if (typeof window !== 'undefined') {
    window.ResizeObserver = window.ResizeObserver ?? ResizeObserver;
}
