var pkg = require('./package.json')
    , webpack = require('webpack')
    , NodeExternals = require('webpack-node-externals')
;

module.exports = {
    target: 'node',
    context: __dirname + '/src',
    devtool: null,
    entry: './index.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        library: true,
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, include: __dirname, loader: 'babel!ts' }
        ]
    },
    externals: [ NodeExternals() ]
};
