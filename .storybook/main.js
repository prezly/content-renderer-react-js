const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: (/** @type {import("webpack").Configuration} */ config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../src'),
        });

        config.module.rules = config.module.rules.filter((rule) => rule.type !== 'asset/resource');

        config.module.rules.push({
            test: /\.(svg)$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
        });

        config.module.rules.push({
            test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
            type: 'asset/resource',
            generator: { filename: 'static/media/[path][name][ext]' },
        });

        config.resolve.alias['styles'] = path.resolve(__dirname, '../src/styles');

        if (configType !== 'PRODUCTION') {
            config.plugins.push(new ReactRefreshPlugin());
        }

        // Return the altered config
        return config;
    },
};
