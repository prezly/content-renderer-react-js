export default (api) => {
    // This caches the Babel config
    api.cache.using(() => process.env.NODE_ENV);

    const isProduction = api.env('production');
    const isDevelopment = api.env('development');
    const isTest = api.env('testing');

    return {
        targets: {
            esmodules: false,
            node: '12',
        },

        presets: [
            '@babel/typescript',
            ['@babel/react', { development: !isProduction, runtime: 'automatic' }],
            '@dr.pogodin/babel-preset-svgr',
            [
                '@babel/env',
                {
                    useBuiltIns: false,
                    modules: 'commonjs',
                    targets: isTest ? { esmodules: false } : undefined,
                },
            ],
        ],

        plugins: [
            ['babel-plugin-transform-remove-imports', { test: '\\.scss$' }],
            // Applies the react-refresh Babel plugin on non-production modes only
            isDevelopment && 'react-refresh/babel',
        ].filter(Boolean),

        overrides: [
            {
                test: './node_modules/@prezly/**/*.mjs',
                plugins: [
                    [
                        '@babel/plugin-transform-modules-commonjs',
                        { importInterop: 'none', strict: true },
                    ],
                ],
            },
        ],
    };
};
