const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/components/chat/index'

    ],
    /*{
     chat: path.join(__dirname, 'src/components/chat', 'index.js'),
     }*/
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/chat/index.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loaders: ['eslint-loader'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            },
            {
                test: /\.js$/,
                loaders: [
                    'react-hot-loader', {
                        loader: 'babel-loader',
                        query: {
                            babelrc: false,
                            cacheDirectory: true,
                            presets: [
                                'es2015',
                                'react',
                                'stage-0'
                            ]
                        }
                    }],
                exclude: [
                    /node_modules/
                ]
            }
        ],
    }
};