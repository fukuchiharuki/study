const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Mutation {
    setMessage(message: String): String
  }
  type Query {
    getMessage: String
  }
`);

const faceDatabase = {};

const rootValue = {
  setMessage: ({message}) => {
    return faceDatabase.message = message;
  },
  getMessage: () => {
    return faceDatabase.message;
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
