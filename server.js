const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const rootValue = {
  quoteOfTheDay: () => Math.random() < 0.5
    ? "Take it easy"
    : "Salvation lies within",
  random: () => Math.random(),
  rollThreeDice: () => [1, 2, 3]
    .map(_ => 1 + Math.floor(Math.random() * 6)),
};

const app = express();
app.use("/graphql", graphqlHTTP({
  schema, 
  rootValue, 
  graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
