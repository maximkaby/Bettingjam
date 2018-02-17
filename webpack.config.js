const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

module.exports = {
  devtool: NODE_ENV === 'development' && 'source-map',
  watch: NODE_ENV === 'development',
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ],
};
