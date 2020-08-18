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