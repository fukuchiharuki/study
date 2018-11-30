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

  test('We can check if console.log() called on say() method', () => {
    const spy = jest.spyOn(console, 'log');
    hello.say();
    expect(spy).toHaveBeenCalledWith(`Hello ${name} World!`);
    spy.mockReset();
    spy.mockRestore();
  });
});
