const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    ip: String
  }
`);

const loggingMiddleware = (request, response, next) => {
  console.log(`ip: ${request.ip}`);
  next();
};

const rootValue = {
  ip: function (args, request) {
    return request.ip;
  },
};

const app = express();
app.use(loggingMiddleware);
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
