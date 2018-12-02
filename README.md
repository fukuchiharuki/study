# ネコミミでもわかるフロントエンド開発環境構築

# 第1章 まずは準備から

### yarnをインストールする

```
$ brew install yarn
```

### VSCodeでEditorConfigを有効にする

次のプラグインをインストールした。

- EditorConfig for VS Code

### package.jsonを作成する

```
$ yarn init
```

# 第2章　JavaScriptを動かす

### Babelモジュールを追加する

```
$ yarn add --dev @babel/preset-env
```

### webpackモジュールを追加する

```
$ yarn add --dev webpack webpack-cli @babel/core babel-loader
```

### JavaScriptをビルドする

```
$ yarn build:dev
```

### JavaScriptを実行する

```
$ node ./dist/index.bundle.js
```

### webpack-dev-serverモジュールを追加する

```
$ yarn add --dev webpack-dev-server html-webpack-plugin
```

`html-webpack-plugin`は開発サーバー用にHTMLを自動的に出力するプラグイン。

### 開発用サーバーを立ち上げる

```
$ yarn serve
```

# 第3章 JavaScriptのためのパワフルなツール

## 3.1 ESLint

### eslint-config-airbnbが指定するバージョンを調べる

```
$ yarn info eslint-config-airbnb peerDependencies
yarn info v1.12.3
{ eslint:
   '^4.19.1 || ^5.3.0',
  'eslint-plugin-import':
   '^2.14.0',
  'eslint-plugin-jsx-a11y':
   '^6.1.1',
  'eslint-plugin-react':
   '^7.11.0' }
✨  Done in 0.31s.
```

### ESLintモジュールを追加する

```
yarn add --dev eslint-config-airbnb \
eslint@^5.3.0 \
eslint-plugin-import@^2.14.0 \
eslint-plugin-jsx-a11y@^6.1.1 \
eslint-plugin-react@^7.11.0 \
babel-eslint
```

### ESLintを実行する

```
$ yarn lint:js
```

### eslint-loaderモジュールを追加する

```
$ yarn add --dev eslint-loader
```

## 3.2 Prettier

### Prettierモジュールを追加する

```
$ yarn add --dev prettier
```

### Prettierを実行する

```
$ yarn prettier
```

## 3.3 Flow

### Flowモジュールを追加する

```
$ yarn add --dev flow-bin @babel/preset-flow eslint-plugin-flowtype
```


### Flowを実行する

```
$ yarn flow
```

### VSCodeでFlowを有効にする

次のプラグインをインストールした。後者は便利そうなのでついでに。

- Flow Language Support
- vscode-flow-ide

プラグインが必要だというので`flow-bin`を`global`にインストールした。

```
$ yarn global add flow-bin
```

Workspace Settingsに次を追記する。

```
"flow.useNPMPackagedFlow": true,
"javascript.validate.enable": false
```

# 第4章　Reactをはじめる

### Reactモジュールを追加する

```
$ yarn add react react-dom
$ yarn add --dev @babel/preset-react
```

# 第5章　CSSを適用する

## MiniCssExtractPlugin

### モジュールを追加する

```
$ yarn add --dev mini-css-extract-plugin css-loader
```

## StyleLint

### StyleLintモジュールを追加する

```
$ yarn add --dev stylelint stylelint-config-standard
```

### VSCodeでStyleLintを有効にする

次のプラグインをインストールした。

- stylelint

## PostCSS

### モジュールを追加する

```
$ yarn add --dev postcss-loader
```

### PostCSSプラグインを追加する

```
$ yarn add --dev autoprefixer
$ yarn add --dev postcss-custom-properties
$ yarn add --dev postcss-nesting
```

### VSCodeでPostCSSを有効にする

次のプラグインをインストールした。

- language-postcss

Workspace Settingsに次を追記した。

```
"files.associations": {
   "*.css": "postcss",
},
```

# 第6章　ReactとCSSの連携

`CSSModules`は`css-loader`が含んでいる。

# 第7章　爆速でテストを書く

## Jest

### Jestモジュールを追加する

```
$ yarn add --dev jest babel-jest 'babel-core@7.0.0-0' @babel/core
```

## Reactコンポーネント

### Reactコンポーネントをテストするためのモジュールを追加する

```
$ yarn add --dev react-test-renderer identity-obj-proxy
```

### Reactコンポーネントのスナップショットを更新する

```
$ yarn jest -u
```

## カバレッジ

### カバレッジを検査する

```
$ yarn jest --coverage
```

# 第8章　プロダクションコードの生成

### webpack-mergeモジュールを追加する

```
$ yarn add --dev webpack-merge
```

### csswringモジュールを追加する

```
$ yarn add --dev csswring
```
