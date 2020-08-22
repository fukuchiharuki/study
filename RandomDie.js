class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    return Array.from(Array(numRolls))
      .map(_ => this.rollOnce());
  }
}

module.exports = RandomDie;