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