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

`curl`から叩くには次のようにする。

```
$ curl -i -H 'Content-Type:application/json' -X POST -d '{"query": "query { hello }"}' http://localhost:4000/graphql
```
