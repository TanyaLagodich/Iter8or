import { sum } from '../index.js';

describe('sum', () => {
  it('should return the sum of the elements', () => {
    const array = [1, 2, 3, 4, 5];

    expect(sum(array)).toBe(15);
  });

  it('should return the sum of the elements with custom callback', () => {
    const array = [{ age: 30 }, { age: 45 }];

    expect(sum(array, (item) => item.age)).toBe(75);
  });

  it('should return with different types of iterators', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    expect(sum(set)).toBe(15);
  });

  it('should return 0 if the iterator is empty', () => {
    const array = [];

    expect(sum(array)).toBe(0);
  });
});
