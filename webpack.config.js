const path = require('path');

module.exports = {
    entry: {
        chat: path.join(__dirname, 'src/components/chat', 'index.js'),
    },
    output: {
        path: 'public',
        filename: 'js/[name]/index.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};