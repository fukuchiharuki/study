const path = require('path');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  // developmentモードで実行する
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/index.js'),
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist
  },
  resolve: {
    // import文のパス指定を省略する
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略する
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しない
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader'
      }
    ]
  },
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map'
}
