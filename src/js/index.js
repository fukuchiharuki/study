// @flow
export class Hello {
  constructor(name) {
    this.name = name;
    this.say();
  }

  say() {
    console.log(`Hello ${this.name} World!`);
  }
}

export default new Hello('nekomimi');
