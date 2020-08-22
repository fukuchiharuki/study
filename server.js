const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const RandomDie = require("./RandomDie");

const schema = buildSchema(`
  type RandomDie {
    roll(numRolls: Int!): [Int]
  }
  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

const rootValue = {
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
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
