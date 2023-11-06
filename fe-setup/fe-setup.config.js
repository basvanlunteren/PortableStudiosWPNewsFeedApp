import path from 'path';

export default {
    /**
     * Output directory for compiled assets, if this is an umbraco project
     * then this is likely to be:
     * path.join(__dirname, '../Web/dist'),
     */
    outputDirectory: path.join(__dirname, 'dist'),

    /**
     * Clean up previous build files upon `yarn build`?
     *  null / false: do not clean
     *  'all': clean all files inside outputDirectory
     *  'previous': only clean previous builds
     *  Anything else will get passed to CleanWebpackPlugin as options.
     */
    cleanOutput: false,

    /**
     * Javascript bundle filename, you can use any of the standard
     * webpack tokens, e.g. [hash]
     */
    jsFilename: 'app.js',

    /**
     * Toggle whether we want to separate out a vendor.js file containing our
     * node_modules dependencies.  If this is set to false, they will be
     * included in the above JS file.
     */
    separateVendor: true,

    /**
     * Filename for our separate vendor JS file if the above setting is true.
     * You can use any of the standard webpack tokens, e.g. [hash]
     */
    vendorFilename: 'vendor.js',

    /**
     * Toggle whether to seperate our CSS from our Javascript.  If this is set
     * to false, the CSS will be bundled in with teh Javascript.
     */
    separateCss: true,

    /**
     * If the above is set to true, this is the filename that will be used for
     * the separated CSS file. You can use any of the standard webpack
     * tokens, e.g. [hash]
     */
    cssFilename: 'app.css',

    /**
     * SVG output filename, sadly this cannot accept tokens so its just
     * whatever is here.
     */
    svgFilename: 'sprite.svg',

    /**
     * If set to true, a manifest.json file will be created alongside the
     * JS file containing references to the output filename, for use with
     * cache busters.
     */
    createManifest: true,

    /**
     * If your bundle size exceeds this, you'll get a warning about it.
     * This is just a heads up to check if things are getting out of hand,
     * feel free to set this to null, false, or some giant number if you don't
     * care.
     */
    maxEntrypointSize: 250000,

    /**
     * If you're using code splitting, it generates individual 'assets'. Same
     * deal as above, this is just an 'FYI' warning.
     */
    maxAssetSize: 250000,

    /**
     * What port to run the dev server on, change this if for some bizarre
     * reason you're running multiple builds at the same time.
     */
    devServerPort: 9000,
};
