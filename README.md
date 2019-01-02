# Spring Bootキャンプ

# 1.[事前準備]Spring BootでHello World

まずmavenをインストールした。

```
$ brew install maven
```

資料に従って次を実行する。（`-DarchetypeVersion`だけあげておいた。 ）

```
$ mvn archetype:generate -B\
 -DarchetypeGroupId=am.ik.archetype\
 -DarchetypeArtifactId=spring-boot-docker-blank-archetype\
 -DarchetypeVersion=1.0.5\
 -DgroupId=kanjava\
 -DartifactId=kusokora\
 -Dversion=1.0.0-SNAPSHOT
```

`spring-boot:run`を実行しようとしても次のエラーになる。

```
InvocationTargetException: Error creating bean with name 'org.springframework.boot.context.properties.ConfigurationPropertiesBindingPostProcessor': Invocation of init method failed; nested exception is java.lang.NoClassDefFoundError: javax/xml/bind/ValidationException: javax.xml.bind.ValidationException
```

pom.xmlに次を追記すると動いた。

```
<!-- https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api -->
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.sun.activation/javax.activation -->
<dependency>
    <groupId>com.sun.activation</groupId>
    <artifactId>javax.activation</artifactId>
    <version>1.2.0</version>
</dependency>
```

後者は実行時にでるエラーに基づいて追記した。

おそらく次のことに絡んでいるものだと思う。

- [java.lang.ClassNotFoundException: javax.xml.bind.JAXBException と来た時の対応 - Qiita]( https://qiita.com/ukiuni@github/items/bf6b14e9aa1090ec4a75)

# 2.[事前準備]JavaでOpenCVを使う

古いOpenCVのAPIを使用する実行でエラーになる。

```
[ERROR] ソース・オプション5は現在サポートされていません。6以降を使用してください。
[ERROR] ターゲット・オプション1.5は現在サポートされていません。1.6以降を使用してください。
```

pom.xmlに次を追記して回避した。（環境に合うところだけでよいはず。）

```
<properties>
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

次の記事に回避策が書かれていた。

- [Mavenまとめ - エンターテイメント！！](http://suzaku-tec.hatenadiary.jp/entry/2017/11/05/145747)

# 3.顔変換サービスの作成

`@Configuration`（または`@SpringBootApplication`）がついたクラスの中でインスタンスを生成するメソッドを書き、そのメソッドに`@Bean`をつけるとBean定義できる。ここでは`ConverterConfig`として別クラスに分けた。

curlでファイルを送信するときは標準入力が使える。ので、次のようにすることができる。（この方が好き。）

```
$ cat /path/to/before.jpg | curl -v -F 'file=@-' http://localhost:8080/duker > after.png
```

# 4.JMSを使ってみる

基本的にSpringのJMSサポート機能がよしなにしてくれる。

- `JmsMessagingTemplate`を（注入して）利用してメッセージを投げて
- `@JmsListener`でメッセージを拾って処理する

# 5.JMSで画像変換を非同期処理

`@JmsListener`で画像処理をするだけ。だが、画像処理の中にスレッドアンセーフなコードがあるので`prototype`スコープでコンポーネントを注入する必要がある。

```
@Component
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
```

# 6.STOMPを使ってみる

`/topic`がpub-sub、`/queue`がP2P（1対1）。

STOMPの`@Configuration`を用意すると、ひとつの`@Component`に対して複数の`@JmsListener`を定義できなくなる？

```
InvocationTargetException: Error creating bean with name 'simpAnnotationMethodMessageHandler' defined in class path resource [org/springframework/web/socket/config/annotation/DelegatingWebSocketMessageBrokerConfiguration.class]: Invocation of init method failed; nested exception is java.lang.IllegalStateException: Ambiguous mapping found. Cannot map 'app' bean method
```

これは、`@JmsListener`を別の`@Component`に切り出すことで回避できた。

# 7.STOMP over WebSocketで非同期処理結果を受信する

`SimpMessagingTemplate`の`convertAndSend`は引数のオブジェクトを`Message`型にconvertしてsendするということ。`JmsMessagingTemplate`とほぼ同じインタフェース。

# 8.WebRTCを使ってみる

WebRTCはプラグイン無しでウェブブラウザ間のボイスチャット・ビデオチャット・ファイル共有ができるリアルタイムコミュニケーションAPI。

`createObjectURL`はのChromeで使えなくなっている。ので、次のようにする。

```
//video.src = window.URL.createObjectURL(stream);
video.srcObject = stream;
```

また、httpsでないと動かないようだが、例外でlocalhostでも動く（Chrome）。