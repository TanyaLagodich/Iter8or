import { toArray } from '../index.js';

describe('toArray', () => {
  describe('works with sync iterators', () => {
    it('should correctly concatenate elements from array', () => {
      const iterable = [1, 2, 3];
      const result = toArray(iterable);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should correctly concatenate elements from Set', () => {
      const iterable = new Set(['a', 'b', 'c']);
      const result = toArray(iterable);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should correctly concatenate elements from string', () => {
      const iterable = 'Hello';
      const result = toArray(iterable);
      expect(result).toEqual(['H', 'e', 'l', 'l', 'o']);
    });
  });

  describe('works with async iterators', () => {
    it('should correctly concatenate elements from an iterable', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 'a';
          yield 'b';
          yield 'c';
        },
      };
      const result = await toArray(asyncIterable);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should correctly concatenate elements from an asynchronous iterable with async functions', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield async () => 'a';
          yield async () => 'b';
          yield async () => 'c';
        },
      };
      const result = await toArray(asyncIterable);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should correctly handle a mix of sync and async values in an asynchronous iterable', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 'a';
          yield async () => 'b';
          yield 'c';
        },
      };
      const result = await toArray(asyncIterable);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should throw a TypeError if the input is not iterable', () => {
      expect(() => toArray(123)).toThrow(TypeError);
      expect(() => toArray(123)).toThrow('The argument must be iterable');
    });
  });
});
