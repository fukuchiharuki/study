import { Hello } from '../js/index';

const name = 'Jest';
let hello;

describe('Hello clas test', () => {
  beforeEach(() => {
    hello = new Hello(name);
  });

  test('We can check if the name define the class constructor', () => {
    expect(hello.name).toBe(name);
  });
});
