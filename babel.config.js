export default () => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return {
        targets: {
            esmodules: false,
            node: '12',
        },

        presets: [
            '@babel/typescript',
            [
                '@babel/react',
                { development: isDevelopment, runtime: isDevelopment ? 'automatic' : undefined },
            ],
            '@dr.pogodin/babel-preset-svgr',
            '@babel/env',
        ],

        plugins: [
            ['babel-plugin-transform-remove-imports', { test: '\\.scss$' }],
            // Applies the react-refresh Babel plugin on non-production modes only
            isDevelopment && 'react-refresh/babel',
        ].filter(Boolean),
    };
};
