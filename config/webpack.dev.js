var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:6080',
                secure: false
            }
        }
    },

    proxy: {
        '/api': {
            target: 'http://127.0.0.1:6080',
            secure: false
        }
    },

});


/**
 * Created by coucoun on 06/10/2016.
 */
