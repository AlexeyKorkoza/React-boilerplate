const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

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
  new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}))
}

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/build',
        publicPath: '/public/build',
        filename: "bundle.js"
    },
    resolve: {
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            applicationStyles: 'public/build/build.css',
        },
        extensions: ['*', '.js', '.jsx'],
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
                use: [
                    'style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        ]
    }
};
