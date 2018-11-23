# ネコミミでもわかるフロントエンド開発環境構築

## 第1章 まずは準備から

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

## 第2章　JavaScriptを動かす

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
