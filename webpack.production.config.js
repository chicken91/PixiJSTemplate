const nodeModules = `${__dirname}/node_modules`;
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require(`${__dirname}/core/data/webpack/webpack.base.config`);
const productionLibraries = [
    `${nodeModules}/gsap/src/index.js`,
    `${nodeModules}/howler/dist/howler.core.min.js`
];

baseWebpackConfig.entry.unshift(...productionLibraries);
const prodWebpackConfig = {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })
    ]
};

module.exports = merge(baseWebpackConfig, prodWebpackConfig);