const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    stories: ['../src/components/**/stories.js'],
    addons: ['@storybook/addon-viewport/register', '@storybook/addon-a11y/register', '@storybook/addon-docs'],
    webpackFinal: async (config, { configType }) => {

        console.log('__dirname', __dirname);
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
                loader: 'sass-resources-loader',
                options: {
                    resources: ['./src/sass/_mixins.scss', './src/sass/_variables.scss'],
                },
            }],
            include: path.resolve(__dirname, '../')
        });
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './dist/sprite.svg',
                        to: './sprite.svg',
                    }
                ]
            }),
        );

        return config;
    }
};
