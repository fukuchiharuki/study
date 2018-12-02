const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.config.common');

const docs = path.join(__dirname, 'docs');

module.exports = merge(common, {
  // productionモードで実行する
  mode: 'production',
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.min.js',
    // 生成先のディレクトリ
    path: docs,
  },
});
