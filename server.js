const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const rootValue = {
  rollDice: ({ numDice, numSides }) => {
    function roll(numSides) {
      return 1 + Math.floor(Math.random() * numSides);
    }
    return Array.from(Array(numDice))
      .map(_ => roll(numSides || 6));
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
