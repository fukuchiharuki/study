# Day 8. Route 53を使ってドメイン登録する

## DNS

### レコードタイプ

<dl>
  <dt>
    A
  </dt>
  <dd>
    ドメインとIPアドレスの対応
  </dd>
  <dt>
    CNAME
  </dt>
  <dd>
    ドメインの別名をマッピング
  </dd>
  <dt>
    NS
  </dt>
  <dd>
    ドメイン（ゾーン）を管理するネームサーバー
  </dd>
</dl>

## Route 53

### Public/Private Hosted Zone

Private Hosted ZoneはVPCの中で名前解決するのに利用することができる。

### ネームサーバー

Route 53でHosted Zoneを作成しする。既に設定済みのNSをドメイン登録サービス（今回Freenom）に設定する。

### Failoverルーティング

プライマリとセカンダリを指定する。プライマリのヘルスチェックに失敗するとセカンダリに振り分ける。

Routing Policyを`Failover`に変更する。プライマリ側はEvaluate Target Healthを`Yes`に設定する。

セカンダリ側もAレコードを`Failover`で登録する（ふたつのAレコードができる）。S3をエイリアスで登録する場合、バケット名をドメインと同じにする必要があることに注意。

なお、Chrome (Mac)では`command + r`でスーパーリロードする。キャッシュが残ってしまって動作が分かりづらい。