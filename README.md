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