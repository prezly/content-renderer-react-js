const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: './sandbox/index.jsx',
    },
    resolve: {
        symlinks: false,
        extensions: ['.js', '.jsx', '.mjs', '.cjs'],
        alias: {
            'react/jsx-dev-runtime': path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
            '@prezly/content-renderer-react-js/styles.css': path.resolve(__dirname, 'build/styles/styles.css'),
            '@prezly/content-renderer-react-js': path.resolve(__dirname, 'build/esm/index.mjs'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'sandbox'),
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
            }
        ],
    },
    plugins: [
        isDevelopment && new ReactRefreshPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './sandbox/index.html',
        }),
    ].filter(Boolean),
};
