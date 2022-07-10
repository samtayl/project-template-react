const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ReactRefreshWebpackPlugin
  = require('@pmmmwh/react-refresh-webpack-plugin');

const ReactRefreshBabelPlugin = require('react-refresh/babel');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    filename: isDevelopment
      ? '[name].js'
      : '[name].[contenthash].js',
    chunkFilename: isDevelopment
      ? '[name].chunk.js'
      : '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devtool: isDevelopment
    ? 'inline-source-map'
    : false,
  devServer: {static: path.resolve(__dirname, 'public')},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React app',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new ESLintWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? '[name].css'
        : '[name].[contenthash].css',
      chunkFilename: isDevelopment
        ? '[name].chunk.css'
        : '[name].[contenthash].chunk.css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new WebpackManifestPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/ui,
            include: path.resolve(__dirname, 'src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    isDevelopment && ReactRefreshBabelPlugin,
                  ].filter(Boolean),
                },
              },
            ],
          },
          {
            test: /\.css$/ui,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {importLoaders: 1},
              },
              'postcss-loader',
            ],
          },
          {
            test: /\.svg$/ui,
            loader: '@svgr/webpack',
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|oft)$/ui,
            type: 'asset',
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/u,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
