import fs from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';
const { peerDependencies } = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

export default {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.ts',
    externals: Object.fromEntries(Object.keys(peerDependencies).map((name) => [name, name])),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve('./tsconfig.build.json'),
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve('./src')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: '@svgr/webpack',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss', '.svg'],
    },
    output: {
        filename: 'index.js',
        globalObject: 'this',
        libraryTarget: 'umd',
        path: path.resolve('./build'),
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    watch: isDev,
};
