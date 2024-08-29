import { toArray } from '../index.js';

describe('toArray', () => {
  it('should return an array from the array', () => {
    const array = [1, 2, 3];

    expect(toArray(array)).toStrictEqual([1, 2, 3]);
  });

  it('should return an array from the Set', () => {
    const set = new Set([1, 2, 3]);

    expect(toArray(set)).toStrictEqual([1, 2, 3]);
  });

  it('should return an array from the string', () => {
    const string = 'hello world';

    expect(toArray(string)).toStrictEqual([
      'h',
      'e',
      'l',
      'l',
      'o',
      ' ',
      'w',
      'o',
      'r',
      'l',
      'd',
    ]);
  });

  it('should return an empty array from an empty iterable', () => {
    const emptyArray = [];

    expect(toArray(emptyArray)).toStrictEqual([]);
  });

  it("should throw a TypeError when the passed parameter isn't an iterable", () => {
    const notIterable = 123;

    expect(() => toArray(notIterable)).toThrow(TypeError);
  });
});
