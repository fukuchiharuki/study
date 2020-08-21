const fetch = require("node-fetch");

const query = `
  query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
  }
`;

const variables = {
  dice: 3,
  sides: 6,
};

fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({ query, variables }),
})
  .then(response => response.json())
  .then(data => console.log(`data returned: ${JSON.stringify(data)}`));
