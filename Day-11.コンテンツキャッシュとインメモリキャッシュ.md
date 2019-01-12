# Day 11. コンテンツキャッシュとインメモリキャッシュ

## CloudFront

CDN。コンテンツをキャッシュしてWebサーバーの負荷を軽減する。

### Origin Settings

オリジンサーバーはELBを指定する。

### Default Cache Behavior Settings

TTLはCloudFrontにコンテンツが留まる時間（秒）。

### HTTPヘッダ

```
$ curl -I <URL>
```

で、HTTPヘッダが取得できる。

ヒットすれば次。

```
X-Cache: Hit from cloudfront
```

ヒットしなければ次。

```
X-Cache: Miss from cloudfront
```

### Popular Objects

集計情報を見ることができる。

### Route 53との紐づけ

**CNAME**

「Alternate Domain Names (CNAMEs)」が設定されている必要がある。

参考：[Route 53 ターゲットがありません](https://aws.amazon.com/jp/premiumsupport/knowledge-center/route-53-no-targets/)

**ヘルスチェック**

また、ヘルスチェックを作成する必要がある。設定対象のドメイン名と同じにできないので、ヘルスチェックに設定するドメイン名はELBのものにした（こうするものなのか...要確認）。

## ElasticCache

### パラメータグループ・サブネットグループ・セキュリティグループ

RDSと同様、パラメータグループとサブネットグループとセキュリティグループを作成する。

カスタムTCPを選択してElasticCache用のセキュリティグループを作成する。なお、セキュリティグループはEC2にて作成する。

### redisクライアント

次でインストール。

```
$ sudo yum install -y redis --enablerepo=epel
```

次で接続。

```
$ redis-cli -h <プライマリエンドポイント>
```
