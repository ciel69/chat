global.Promise         = require('bluebird');

const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER:  JSON.stringify(true),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new CleanWebpackPlugin([ 'public/assets/' ], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/client.js'

    ],
    /*{
     chat: path.join(__dirname, 'src/components/chat', 'index.js'),
     }*/
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/'+jsName,
        publicPath: '/public/'
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions:['.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.jsx?$/,
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