# GraphQL.js

# Getting Started

`buildSchema`でスキーマを定義できる。

```
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
```

エンドポイントにつき"resolver"関数が必要。

```
const root = {
  hello: () => {
    return 'Hello world!';
  },
};
```

# Running Express + GraphQL

`graphiql`オプションでdevtoolが使える。

```
app.use("/graphql", graphqlHTTP({
  schema, rootValue, graphiql: true,
}));
```

# GraphQL Clients

`curl`から叩くには次のようにする。

```
$ curl -i \
-X POST \
-H 'Content-Type:application/json' \
-d '{"query": "query { hello }"}' \
http://localhost:4000/graphql
```

# Basic Types

次のスカラー型がある。

- `String`
- `Int`
- `Float`
- `Boolean`
- `ID`

デフォルトでnullable。`String!`でnot-nullableのString。

リスト型は`[Int]`。この場合Intのリスト。

# Passing Arguments

エンドポイントは引数をもてる。

```
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

resolver関数で引数を扱う。

```
const rootValue = {
  rollDice: ({ numDice, numSides }) => { /* return something */ }
};
```

コードで引数を渡すときは別の変数にマップするといい。

```
const query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;
```

# Object Types

オブジェクトはフィールドまたは引数のあるメソッドをもてる。クエリタイプと同じ方法で新しいオブジェクトを定義できる。

```
type RandomDie {
  roll(numRolls: Int!): [Int]
}
```

オブジェクトタイプを定義することで、一度のAPIリクエストですべての情報を取得できる。複数回のAPIリクエストでそれをするのに比べてシンプルである。

# Mutations and Input Types

データ更新を伴うエンドポイントは`Mutation`で作る。入力パラメーターは`input`で作る。

```
type Mutation {
  createMessage(input: MessageInput): Message
}
```

```
input MessageInput {
  content: String
  author: String
}
```

入力タイプはスカラー型かリスト型、他の入力タイプだけをフィールドにもてる（他のオブジェクトをフィールドにもてない）。

入力タイプの名前の末尾に`Input`をつけるのは慣例。少しの違いしかない入力タイプと出力タイプをもちたくなるので。