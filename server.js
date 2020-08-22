const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
  type Query {
    getMessage(id: ID!): Message
  }
`);

const fakeDatabase = {};

const rootValue = {
  createMessage: ({ input }) => {
    const id = Date.now();
    fakeDatabase[id] = input;
    return { id, ...input };
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id]) throw new Error(`unavailable(id=${id})`);
    fakeDatabase[id] = input;
    return { id, ...input };
  },
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) throw new Error(`unavailable(id=${id})`);
    return { id, ...fakeDatabase[id] };
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
