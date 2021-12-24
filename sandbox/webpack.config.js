const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: './src/index.jsx',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.cjs'],
        alias: {
            '#content-renderer-react-js': path.resolve(__dirname, '../build/esm'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        isDevelopment && new ReactRefreshPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),
    ].filter(Boolean),
};
