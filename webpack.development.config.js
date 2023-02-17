const nodeModules = `${__dirname}/node_modules`;
const { merge } = require('webpack-merge');
const baseWebpackConfig = require(`${__dirname}/core/data/webpack/webpack.base.config`);
const developmentLibraries = [
    `${nodeModules}/fpsmeter/dist/fpsmeter.min.js`,
    `${nodeModules}/gsap/src/index.js`,
    `${nodeModules}/howler/dist/howler.core.min.js`
];

baseWebpackConfig.entry.unshift(...developmentLibraries);
const devWebpackConfig = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: baseWebpackConfig.output.path,
        port: 3000,
        hot: true,
        open: true,
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            }
        },
    }
};

module.exports = merge(baseWebpackConfig, devWebpackConfig);
