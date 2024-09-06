import { DigitsIterable } from '../DigitsIterable.js';

describe('DigitsIterable', () => {
  it('should correctly iterate over the digits of a positive number', () => {
    const digits = new DigitsIterable(12345);
    const result = [...digits];
    expect(result).toEqual([5, 4, 3, 2, 1]);
  });

  it('should return an empty array for the number 0', () => {
    const digits = new DigitsIterable(0);
    const result = [...digits];
    expect(result).toEqual([]);
  });

  it('should correctly iterate over a single digit number', () => {
    const digits = new DigitsIterable(7);
    const result = [...digits];
    expect(result).toEqual([7]);
  });

  it('should correctly handle large numbers', () => {
    const digits = new DigitsIterable(9876543210);
    const result = [...digits];
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should correctly handle the number 1', () => {
    const digits = new DigitsIterable(1);
    const result = [...digits];
    expect(result).toEqual([1]);
  });

  it('should handle consecutive iterations correctly', () => {
    const digits = new DigitsIterable(456);
    const firstIteration = [...digits];
    const secondIteration = [...digits];

    expect(firstIteration).toEqual([6, 5, 4]);
    expect(secondIteration).toEqual([6, 5, 4]);
  });

  it('should correctly iterate over the digits of a very large number', () => {
    const digits = new DigitsIterable(98765432109876543210n);
    const result = [...digits];
    expect(result).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  it('should work with negative integers', () => {
    const digits = new DigitsIterable(-123);
    const result = [...digits];
    expect(result).toEqual([3, 2, 1]);
  });

  it('should work with negative Bigint', () => {
    const digits = new DigitsIterable(BigInt(-123n));
    const result = [...digits];
    expect(result).toEqual([3, 2, 1]);
  });

  it('shouldn\'t work with decimal integers', () => {
    const digitsIter = () => new DigitsIterable(123.45);
    expect(digitsIter).toThrow(RangeError);
    expect(digitsIter).toThrow('The number 123.45 cannot be converted to an Iterable because it is not an integer');
  });
});
