import toSet from '../toSet.js';

describe('toSet', () => {
  describe('works with sync iterators', () => {
    it('should correctly convert iterable to a Set', () => {
      const iterable = [1, 2, 3, 2];
      const result = toSet(iterable);
      expect(result).toEqual(new Set([1, 2, 3]));
    });

    it('should correctly convert a Set to a new Set', () => {
      const iterable = new Set(['a', 'b', 'a']);
      const result = toSet(iterable);
      expect(result).toEqual(new Set(['a', 'b']));
    });
  });

  describe('works with async iterators', () => {
    it('should correctly convert iterable to a Set', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 'a';
          yield 'b';
          yield 'a';
        },
      };
      const result = await toSet(asyncIterable);
      expect(result).toEqual(new Set(['a', 'b']));
    });

    it('should correctly handle a mix of sync and async values in iterable', async () => {
      const asyncIterable = {
        async *[Symbol.asyncIterator]() {
          yield 'a';
          yield async () => 'b';
          yield 'a';
        },
      };
      const result = await toSet(asyncIterable);
      expect(result).toEqual(new Set(['a', 'b']));
    });

    it('should throw a TypeError if the input is not iterable', () => {
      expect(() => toSet(123)).toThrow(TypeError);
      expect(() => toSet(123)).toThrow('The argument must be iterable');
    });
  });
});
