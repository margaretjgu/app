// webpack.config.js
const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    context: __dirname,
    entry: slsw.lib.entries,
    target: 'node',
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: [
                [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, '.serverless'),
                    path.resolve(__dirname, '.webpack'),
                ],
            ],
        },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            src: path.resolve(__dirname, 'src/')
        },
    },
    optimization: {
        minimize: false // Update to 'true' if u want webpack to minimize your code
    },
    performance: {
        hints: false
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
};
