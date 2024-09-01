import { partition } from '../index.js';

describe('partition', () => {
  const isEven = (n) => n % 2 === 0;

  describe('works with sync iterators', () => {
    it('should partition iterable into two arrays based on the predicate', () => {
      const iterable = [1, 2, 3, 4, 5, 6];
      const [evens, odds] = partition(iterable, isEven);
      expect(evens).toEqual([2, 4, 6]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe('works with async iterators', () => {
    it('should partition iterable into two arrays based on the predicate', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
          yield 6;
        },
      };
      const [evens, odds] = await partition(asyncIterable, isEven);
      expect(evens).toEqual([2, 4, 6]);
      expect(odds).toEqual([1, 3, 5]);
    });

    it('should throw a TypeError if the argument is not iterable', () => {
      expect(() => partition(123, isEven)).toThrow(TypeError);
    });
  });
});
