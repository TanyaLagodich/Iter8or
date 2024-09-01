import { toString } from '../index.js';

describe('toString', () => {
  describe('works with sync iterators', () => {
    it('should correctly concatenate elements from array', () => {
      const iterable = [1, 2, 3];
      const result = toString(iterable);
      expect(result).toBe('123');
    });

    it('should correctly concatenate elements from Set', () => {
      const iterable = new Set(['a', 'b', 'c']);
      const result = toString(iterable);
      expect(result).toBe('abc');
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
      const result = await toString(asyncIterable);
      expect(result).toBe('abc');
    });

    it('should correctly concatenate elements from an asynchronous iterable with async functions', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield async () => 'a';
          yield async () => 'b';
          yield async () => 'c';
        },
      };
      const result = await toString(asyncIterable);
      expect(result).toBe('abc');
    });

    it('should correctly handle a mix of sync and async values in an asynchronous iterable', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 'a';
          yield async () => 'b';
          yield 'c';
        },
      };
      const result = await toString(asyncIterable);
      expect(result).toBe('abc');
    });

    it('should throw a TypeError if the input is not iterable', () => {
      expect(() => toString(123)).toThrow(TypeError);
      expect(() => toString(123)).toThrow('The argument must be iterable');
    });
  });
});
