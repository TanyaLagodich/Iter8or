import { createFlatIterator } from '../index.js';
import { convertToAsyncIterator } from '../../utils/convertToAsyncIterator.js';

describe('createFlatIterator', () => {
  describe('works with sync iterators', () => {
    it('should flatten a synchronous iterable to depth 1', () => {
      const nestedArray = [1, [2, 3], [4, [5, 6]]];
      const flatIterator = createFlatIterator(nestedArray, 1);
      const result = [...flatIterator];

      expect(result).toEqual([1, 2, 3, 4, [5, 6]]);
    });

    it('should flatten a synchronous iterable to depth 2', () => {
      const nestedArray = [1, [2, 3], [4, [5, 6]]];
      const flatIterator = createFlatIterator(nestedArray, 2);
      const result = [...flatIterator];

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should flatten a synchronous iterable to depth Infinity', () => {
      const nestedArray = [1, [2, 3], [4, [5, [6, 7]]]];
      const flatIterator = createFlatIterator(nestedArray, Infinity);
      const result = [...flatIterator];

      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should return an iterator', () => {
      const nestedArray = [1, [2, 3], [4, [5, [6, 7]]]];
      const flatIterator = createFlatIterator(nestedArray, Infinity);

      expect(typeof flatIterator[Symbol.iterator]).toBe('function');
      expect(flatIterator[Symbol.iterator]()).toBe(flatIterator);
    });

    it('should throw an error when the method gets a non-iterable argument', () => {
      const nonIterable = 123;
      const flatIterator = () => createFlatIterator(nonIterable, (x) => [x]);

      expect(flatIterator).toThrow(TypeError);
      expect(flatIterator).toThrow('first argument must be an iterable');
    });
  });

  describe('works with async iterators', () => {
    it('should flatten a synchronous iterable to depth 1', async () => {
      const nestedArray = convertToAsyncIterator([
        async () => 1,
        [async () => 2, async () => 3],
        [async () => 4, [async () => 5, async () => 6]],
      ]);
      const flatIterator = createFlatIterator(nestedArray, 1);

      expect(await flatIterator.next()).toEqual({ done: false, value: 1 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 2 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 3 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 4 });
      expect(await flatIterator.next()).toEqual({
        done: false,
        value: [expect.any(Function), expect.any(Function)],
      });
      expect(await flatIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should flatten a synchronous iterable to depth 2', async () => {
      const nestedArray = convertToAsyncIterator([
        async () => 1,
        [async () => 2, async () => 3],
        [async () => 4, [async () => 5, async () => 6]],
      ]);
      const flatIterator = createFlatIterator(nestedArray, 2);

      expect(await flatIterator.next()).toEqual({ done: false, value: 1 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 2 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 3 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 4 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 5 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 6 });
      expect(await flatIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should flatten an iterable to depth Infinity', async () => {
      const nestedArray = convertToAsyncIterator([
        async () => 1,
        [async () => 2, async () => 3],
        [async () => 4, [async () => 5, [async () => 6, async () => 7]]],
      ]);
      const flatIterator = createFlatIterator(nestedArray, Infinity);

      expect(await flatIterator.next()).toEqual({ done: false, value: 1 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 2 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 3 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 4 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 5 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 6 });
      expect(await flatIterator.next()).toEqual({ done: false, value: 7 });
      expect(await flatIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should return an iterator', () => {
      const nestedArray = convertToAsyncIterator([
        async () => 1,
        [async () => 2, async () => 3],
        [async () => 4, [async () => 5, [async () => 6, async () => 7]]],
      ]);
      const flatIterator = createFlatIterator(nestedArray, Infinity);

      expect(typeof flatIterator[Symbol.asyncIterator]).toBe('function');
      expect(flatIterator[Symbol.asyncIterator]()).toBe(flatIterator);
    });
  });
});
