const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
  {
    apply: (compiler) => {
      rimraf.sync(compiler.options.output.path)
    }
  },
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 4
  }),
  new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}))
}

module.exports = {
    context: __dirname + '/frontend/src',
    watchOptions: {
        poll: true,
    },
    entry: './index.js',

    output: {
        path: __dirname + '/frontend/public',
        publicPath: '/frontend/public/',
        filename: 'app.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins,

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react"]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'css-loader!sass-loader'
                ),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        ]
    }
};
