import path from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: './sandbox/index.jsx',
    },
    resolve: {
        symlinks: false,
        extensions: ['.js', '.jsx', '.mjs', '.cjs'],
        alias: {
            'react/jsx-dev-runtime': path.resolve('node_modules/react/jsx-dev-runtime.js'),
            '@prezly/content-renderer-react-js/styles.css': path.resolve('build/styles/styles.css'),
            '@prezly/content-renderer-react-js': path.resolve('build/cjs/index.cjs'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve('sandbox'),
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
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
