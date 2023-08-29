module.exports = {
    extends: './babel.config.cjs',
    targets: {
        esmodules: true,
    },
    presets: [['@babel/env', { modules: false }]],
    plugins: [['babel-plugin-add-import-extension', { extension: 'mjs' }]],
};
