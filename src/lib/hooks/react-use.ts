/*
 * This is an ES adapter for react-use CommonJS build.
 *
 * The problem with the react-use ESM build is that it's only working
 * with a permissive interop import logic (typescript / babel),
 * but fails when a named import done from within a node native ES module environment.
 *
 * This adapter re-exports individual hooks as ES-friendly named exports.
 */

import _useLatest from 'react-use/lib/useLatest.js';

function unwrap<T>(module: T | { __esModule: boolean; default: T }): T {
    if (typeof module === 'object' && '__esModule' in module && 'default' in module) {
        return module.default;
    }
    return module;
}

export const useLatest = unwrap(_useLatest);
