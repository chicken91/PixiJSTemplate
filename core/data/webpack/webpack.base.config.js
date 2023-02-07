const webpack = require('webpack');
const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const platform = process.env.PLATFORM || 'desktop';
const rootDirectory = process.cwd();
const buildDirectory = path.resolve(rootDirectory, "bin/");
const isProduction = nodeEnv === 'production';

const webpackModule = {
    entry: [`${rootDirectory}/src/index.ts`],
    context: rootDirectory,
    output: {
        path: buildDirectory,
        publicPath: "/",
        filename: `index.js`
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
            { test: /\.ts$/, use: `ts-loader`, exclude: /node_modules/ },
            { test: /\.html$/, use: "dot-loader" },
            { test: /.(png|jpg)$/, use: 'file-loader?name=img/[name].[ext]' }]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ __PROD__: isProduction, __PLATFORM__: `"${platform}"`, __DEV__: !isProduction })
    ]
};

module.exports = webpackModule;
