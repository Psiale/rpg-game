const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app:
            './src/index.js',
    'production-dependencies': ['phaser'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'build') },
          { from: path.resolve(__dirname, 'assets/'), to: path.resolve(__dirname, 'build') },
        ],
      },
    ),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
  optimization: {
    splitChunks: {
      name: 'production-dependencies',
      filename: 'production-dependencies.bundle.js',
    },
  },
};