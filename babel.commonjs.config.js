export default {
    extends: './babel.config.js',
    presets: [['@babel/env', { modules: 'commonjs' }]],
    plugins: [
        ['babel-plugin-add-import-extension', { extension: 'cjs' }],
        ['@babel/plugin-transform-modules-commonjs', { importInterop: 'none', strict: true }],
    ],
};
