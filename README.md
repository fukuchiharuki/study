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
