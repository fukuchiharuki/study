const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.common');

const dist = path.join(__dirname, 'dist');

module.exports = merge(common, {
  // developmentモードで実行する
  mode: 'development',
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // babel-loaderよりも前に実行する
        enforce: 'pre',
        loader: 'eslint-loader',
      },
    ],
  },
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // 開発サーバーを立ち上げるディレクトリ
    contentBase: dist,
    // hot-reload有効
    hot: true,
    // サーバーが利用するポート
    port: 3000,
  },
  plugins: [
    // hot-reloadを有効にするプラグインを追加
    new webpack.HotModuleReplacementPlugin(),
  ],
});
