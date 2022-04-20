export default {
    extends: './babel.config.mjs',
    targets: {
        esmodules: true,
    },
    presets: [['@babel/env', { modules: false }]],
    plugins: [['babel-plugin-add-import-extension', { extension: 'mjs' }]],
};
