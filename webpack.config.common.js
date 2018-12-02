const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');

// NODE_ENVがproductionかどうか
const modeIsProd = process.env.NODE_ENV === 'production';

module.exports = {
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/render.jsx'),
  resolve: {
    // import文のパス指定を省略する
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略する
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しない
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // HtmlWebpackPluginプラグインを追加
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'html/index.html'),
    }),
    // MiniCSSExtractPluginプラグインを追加
    new MiniCSSExtractPlugin({
      filename: modeIsProd ? 'bundle.min.css' : 'bundle.css',
    }),
  ],
};
