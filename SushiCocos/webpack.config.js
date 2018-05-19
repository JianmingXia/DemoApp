const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OnBuildWebpackPlugin = require('on-build-webpack');
const fs = require('fs');

const buildDir = '/src/';

const output = {
    filename: '[name].[chunkhash].js'
};

if (require('yargs').argv.env && require('yargs').argv.env.build_type == "watch") {
    output.filename = '[name].js';
}

module.exports = {
    context: __dirname + '/tssrc',
    entry: {
        index: './Bootstrap.ts',
        vendor: [
            "lodash", 
            "punycode", 
            "md5",
            "babel-polyfill"
        ]
    },
    output: {
        path: __dirname + buildDir,
        publicPath: buildDir,
        // library: "CocosTSGame",
        // libraryTarget: "umd",
        chunkFilename: '[name].[chunkhash].js',
        ...output
    },
    resolve: {
        modules: [
            __dirname,
            "node_modules"
        ],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            lodash: "lodash/lodash.min.js"
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            punycode: 'punycode',
            md5: 'md5'
        }),
        new OnBuildWebpackPlugin(function (stats) {
            const newlyCreatedAssets = stats.compilation.assets;

            const unlinked = [];
            fs.readdir(path.resolve(__dirname + buildDir), (err, files) => {
                files.forEach(file => {
                    if (!newlyCreatedAssets[file]) {
                        fs.unlink(path.resolve(__dirname + buildDir + file));
                        unlinked.push(file);
                    }
                });
                if (unlinked.length > 0) {
                    console.log('Removed old assets: ', unlinked);
                }
            });
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    }
}