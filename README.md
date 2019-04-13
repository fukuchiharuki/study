# Ansibleによるシステム構成管理：基礎からCloud Modulesを使ったAWS構築まで

# Section 2: 開発環境を準備する

```
> vagrant up
```

### 罠１：日本語のフォルダー名は使えない

Windowsを利用する場合、ホームディレクトリが日本語だとうまくいかない。

VirtualBoxの環境設定にて次を適当なディレクトリ（`C:\etc\virtualbox`など）に変更する。

```
一般 > デフォルトの仮想マシンフォルダー(M):
```

vagrant用の環境変数を作成して適当なディレクトリ（`C:\etc\vagrant`など）を設定する。

```
VAGRANT_HOME
```

### 罠２：プラグインのインストールが必要

すると次が表示された後中断する。

```
Vagrant:
* Unknown configuration section 'vbguest'.
```

`vbguest`はプラグインのようなので次でインストールする。

```
> vagrant plugin install vagrant-vbguest
```

### 罠３：BIOSの設定が必要

進んだところで次が表示された後タイムアウトする。

```
default: SSH auth method: private key
```

これは`仮想化支援機能(VT-x/AMD-V)`が有効になっていないことによるようなので有効化する。（詳しいことは次の記事を参照してほしい。）

- [CentOS - default: SSH auth method: private key から一向に進まない。｜teratail](https://teratail.com/questions/28619)
- [仮想化支援機構(VT-x/AMD-V)を有効化できません Vagrant upでOS起動失敗した](https://futurismo.biz/archives/1647/)

# Section 3: 簡単なPlaybookを実行する

### 用語

<dl>
    <dt>playbook</dt>
    <dd>ホストグループを指定する構成の定義</dd>
    <dt>task</dt>
    <dd>構成の要素の定義</dd>
    <dt>inventory</dt>
    <dd>対象のホストグループの定義</dd>
    <dt>template</dt>
    <dd>配布するファイル</dd>
    <dt>handler</dt>
    <dd>task成功時に起動する処理</dd>
    <dt>group var</dt>
    <dd>各ホストグループの変数の定義</dd>
</dl>

### 実行

```
$ ansible-playbook -i <inventory file> <playbook file>
```

# Section 4: Roleを作成する

### 用語

<dl>
    <dt>role</dt>
    <dd>tasks, templates, handlersをまとめた構成の定義</dd>
</dl>

### 構成

```
└ roles/
  └ <role-name>/
    ├ handlers/
    │ └ main.yml
    ├ tasks/
    │ └ main.yml
    └ templates/
      └ <template-file>
```

実行はrolesに切り出す前と同じ。

# Section 5: よく使うAnsibleモジュール

## hostname

ホスト名を設定する。

マジック変数`inventory_hostname`を利用することができる。この変数にはインベントリのホスト名が入る。

## group

（Unix系OSの）グループを作成する。

書式`with_items`を利用することで、同じ設定の仕方で複数の値を指定することができる。

## user

（Unix系OSの）ユーザーを作成する。

公開鍵はモジュール`authorized_key`にて設定する。

ここでは、`passlib`でパスワードを、`ssh-keygen`で公開鍵を作成する。

パスワードは次のコマンドを実行して表示される文字列を使う。

```
$ python -c "from passlib.hash import sha512_crypt; import getpass; print(sha512_crypt.using(rounds=5000).hash(getpass.getpass()))"
```

公開鍵は次のコマンドで作成されるファイルの中身を使う。

```
$ ssh-keygen -t rsa
```