const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: String
    name: String
  }
  type Query {
    user(id: String): User
  }
`);

const fakeDatabase = {
  "a": {
    id: "a",
    name: "alice",
  },
  "b": {
    id: "b",
    name: "bob",
  },
};

const rootValue = {
  user: ({id}) => {
    return fakeDatabase[id];
  },
};

const app = express();
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
