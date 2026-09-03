import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');

export default {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        reactDocgen: false,
    },
    webpackFinal: (config) => {
        // Webpack's built-in TypeScript support cannot compile JSX, so hand every source
        // file to Babel instead — the same way Storybook 6 used to.
        config.experiments = { ...config.experiments, typescript: false };

        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: sourceDirectory,
        });

        config.module.rules = config.module.rules.filter((rule) => rule.type !== 'asset/resource');

        config.module.rules.push({
            test: /\.svg$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
        });

        config.module.rules.push({
            test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
            type: 'asset/resource',
            generator: { filename: 'static/media/[path][name][ext]' },
        });

        config.resolve.alias.styles = path.resolve(sourceDirectory, 'styles');

        return config;
    },
};
