import { RangeIterable } from '../RangeIterable.js';

describe('RangeIterable', () => {
  it('should iterate from 1 to the given positive number', () => {
    const range = new RangeIterable(5);
    const result = [...range];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should iterate from -1 to the given negative number', () => {
    const range = new RangeIterable(-5);
    const result = [...range];
    expect(result).toEqual([-1, -2, -3, -4, -5]);
  });

  it('should throw an error if number exceeds the positive limit', () => {
    expect(() => new RangeIterable(2 ** 32)).toThrow(RangeError);
  });

  it('should throw an error if number exceeds the negative limit', () => {
    expect(() => new RangeIterable(-(2 ** 32)).toThrow(RangeError));
  });

  it('should correctly handle the maximum positive range', () => {
    const range = new RangeIterable(1e7);
    const iterator = range[Symbol.iterator]();

    // Проверка первого и последнего элементов, пропуская всё остальное
    expect(iterator.next().value).toBe(1);

    let lastValue;
    for (let i = 0; i < 1e7 - 1; i++) {
      lastValue = iterator.next().value;
    }

    expect(lastValue).toBe(1e7);
  });

  it('should correctly handle the maximum negative range', () => {
    const range = new RangeIterable(-1e7);
    const iterator = range[Symbol.iterator]();

    // Проверка первого и последнего элементов, пропуская всё остальное
    expect(iterator.next().value).toBe(-1);

    let lastValue;
    for (let i = 0; i < 1e7 - 1; i++) {
      lastValue = iterator.next().value;
    }

    expect(lastValue).toBe(-1e7);
  });
});
