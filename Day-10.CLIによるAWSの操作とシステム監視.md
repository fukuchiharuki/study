# Day 10. CLIによるAWSの操作とシステム監視

## AWS CLI

### インストール

pipをインストール。

```
$ sudo easy_install pip
```

AWS CLIをインストール。

```
$ pip install awscli --upgrade --user
```

パスを設定。

```
export PATH=$PATH:$HOME/Library/Python/2.7/bin
```

参考：

- [macOS で AWS Command Line Interface をインストールする - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-macos.html#awscli-install-osx-pip)

### 初期設定

```
$ aws configure
```

次のようにすると名前がつけられる。

```
$ aws configure --profile <name>
```

awsコマンド実行するときに`--profile <name>`をつけてプロファイルを指定できる。

## システム監視

### SNS

pub/subメッセージングサービス。

なお、請求アラートは「米国東部（バージニア北部）」にある。リージョンを「東京」にしていると現れないので注意。