export default (api) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    api.cache(isDevelopment);

    return {
        targets: {
            esmodules: false,
            node: '12',
        },

        presets: [
            '@babel/typescript',
            ['@babel/react', { development: isDevelopment, runtime: 'automatic' }],
            '@dr.pogodin/babel-preset-svgr',
            '@babel/env',
        ],

        plugins: [['babel-plugin-transform-remove-imports', { test: '\\.scss$' }]],
    };
};
