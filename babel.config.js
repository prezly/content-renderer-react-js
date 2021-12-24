module.exports = (api) => {
    const isTest = api.env('test');

    return {
        targets: {
            esmodules: false,
            node: '12',
        },
        presets: [
            '@babel/typescript',
            '@babel/react',
            '@dr.pogodin/babel-preset-svgr',
            ['@babel/env', { useBuiltIns: false,  modules: 'commonjs' }],
        ],
        plugins: [
            ['babel-plugin-transform-remove-imports', { test: '\\.scss$' }],
        ].filter(Boolean),
    };
};
