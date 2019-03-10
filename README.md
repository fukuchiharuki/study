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