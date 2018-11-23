# ネコミミでもわかるフロントエンド開発環境構築

## 第1章 まずは準備から

### yarnをインストールする

```
$ brew install yarn
```

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
