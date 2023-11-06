import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../fe-setup.config';
import getCommonConfig from './common';

/**
 * Development config is common config + this stuff below.  It's pretty
 * barebones as most of the actual config pertains to the production build.
 */
export default merge(getCommonConfig(true), {
    mode: 'development',
    output: {
        filename: 'bundle.js',
    },
    plugins: [
        /**
         * The following HTMLWebpackPlugin configs are to generate our
         * example html files which (if you've not changed it), will be found at
         * http://localhost:9000
         */
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'favicon.ico',
        }),
    ],
    devServer: {
        hot: true,
        contentBase: config.outputDirectory,
        compress: true,
        port: config.devServerPort,
    },
});
