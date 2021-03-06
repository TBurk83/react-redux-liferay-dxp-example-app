const webpack = require('webpack');
const path = require('path');
var nodeModules = path.resolve(path.join(__dirname, 'node_modules'));

// temporarily suppress babel plugin warning
process.noDeprecation = true;

module.exports = {
    bail: true,
    context: path.join(__dirname, "src"),
    entry: {
        app: "./app.js",
    },
    output: {
        filename: "app.js",
        path: path.join(__dirname, "build"),
        devtoolModuleFilenameTemplate: '[resource-path]',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(__dirname, 'react_runtime', 'react_runtime-manifest.json'))
        }),
        // avoid issues in things like React-Router that test for the value of NODE_ENV
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    ],
    module: {
        loaders: [{
                test: /\.js?$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-es2015-destructuring", "transform-object-rest-spread", "transform-class-properties"]
                }
            },
            {
                test: /\.(css|scss)$/,
                include: [
                    path.join(nodeModules, 'bootstrap'),
                ],
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },
    devtool: 'source-map',
}