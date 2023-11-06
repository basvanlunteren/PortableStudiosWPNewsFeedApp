import path from 'path';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import config from '../fe-setup.config';

export default function getCommonConfig(isDev) {
    return {
        entry: {
            app: path.resolve(__dirname, '../src/index.js'),
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev || !config.separateCss ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader', {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: ['./src/sass/_mixins.scss', './src/sass/_variables.scss'],
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true,
                        spriteFilename: config.svgFilename,
                    },
                },
                {
                    test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new SpriteLoaderPlugin({
                plainSprite: true,
            }),
        ],
    };
}
