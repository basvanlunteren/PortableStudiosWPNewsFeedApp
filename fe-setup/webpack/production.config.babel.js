import path from 'path';
import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackAssetsManifestPlugin from 'webpack-assets-manifest';
import config from '../fe-setup.config';
import getCommonConfig from './common';

/**
 * Clean up any previously generated build files, this is mainly useful when
 * we're using hashed filenames (e.g. app.[hash].js) so we don't end up with a
 * build directory full of old crap.
 */
const clean = () => {
    // clean all files in /dist
    if (config.cleanOutput === 'all') {
        return new CleanWebpackPlugin();
    }
    // clean last build
    if (config.cleanOutput === 'previous') {
        return new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                config.jsFilename.replace(/\[[^\]]*\]/g, '*'),
                config.cssFilename.replace(/\[[^\]]*\]/g, '*'),
                config.vendorFilename.replace(/\[[^\]]*\]/g, '*'),
            ],
        });
    }
    return new CleanWebpackPlugin(config.cleanOutput);
};

/**
 * Pull our CSS out into a separate file, not always required but it tends to
 * solve the 'ol 'unstyled content' flash everyone loves.
 */
const extractCss = () => new MiniCssExtractPlugin({
    filename: config.cssFilename,
});

/**
 * The aim is to end up with a nice clean manifest file, like so:
 * {
 *   "app.css": "app.f5dab381e31399701e70.css",
 *   "app.js": "app.f5dab381e31399701e70.js",
 *   "vendor.js": "vendor.f5dab381e31399701e70.js"
 * }
 *
 * We're using the webpack-assets-manifest plugin to do most of the work, but
 * the output from that is not quite what we're looking for, so some
 * manipulation is necessary
 */
const createManifest = () => {
    const manifest = new WebpackAssetsManifestPlugin();
    manifest.hooks.customize.tap('fe-setup', (entry) => {
        let { key, value } = entry;
        // ignore anything that isn't a CSS or JS file:
        if (!/\.(js|css)$/.test(entry.key)) return false;

        // strip out any paths in the key & value
        key = path.basename(key);
        value = path.basename(value);

        /**
         * fix any chunked keys, so we can just refer to vendor as 'vendor.js'
         * instead of vendor~app.js
         */
        key = key.replace(/~([^.]+)/, '');

        return { key, value };
    });
    return manifest;
};

/**
 * Get a list of plugins, this is dependent on setting from
 * fe-setup.config.js
 */
const getPlugins = () => {
    const plugins = [];
    // Clean our output?
    if (config.cleanOutput) {
        plugins.push(clean());
    }
    // Separate our CSS?
    if (config.separateCss) {
        plugins.push(extractCss());
    }
    // Create a manifest file?
    if (config.createManifest) {
        plugins.push(createManifest());
    }
    return plugins;
};

/**
 * If config.separateVendor is true, this tells webpack to extract everything
 * used in node_modules into our [vendorfilename] file.
 */
const getCacheGroups = () => {
    const cacheGroups = {};

    if (config.separateVendor) {
        cacheGroups.vendor = {
            test: /node_modules/,
            chunks: 'initial',
            filename: config.vendorFilename,
            priority: 10,
            enforce: true,
        };
    }

    return cacheGroups;
};

/**
 * And here we go, the production config is the common config + this stuff.
 */
export default merge(getCommonConfig(false), {
    mode: 'production',
    output: {
        path: config.outputDirectory,
        filename: config.jsFilename,
    },
    optimization: {
        chunkIds: 'named',
        splitChunks: {
            cacheGroups: getCacheGroups(),
        },
    },
    plugins: getPlugins(),
});
