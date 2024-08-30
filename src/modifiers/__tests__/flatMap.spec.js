import { createFlatMapIterator } from '../index.js';
import {
  asyncArray,
  createAsyncIterator,
  syncArray,
} from './__fixtures__/index.js';

describe('createFlatMapIterator', () => {
  describe('works with sync iterators', () => {
    it('should flatten and map each element of the iterable', () => {
      const iterator = createFlatMapIterator(syncArray, (item) => [
        item,
        item * 2,
      ]);

      expect(iterator.next()).toEqual({ done: false, value: 1 });
      expect(iterator.next()).toEqual({ done: false, value: 2 });
      expect(iterator.next()).toEqual({ done: false, value: 2 });
      expect(iterator.next()).toEqual({ done: false, value: 4 });
      expect(iterator.next()).toEqual({ done: false, value: 3 });
      expect(iterator.next()).toEqual({ done: false, value: 6 });
      expect(iterator.next()).toEqual({ done: false, value: 4 });
      expect(iterator.next()).toEqual({ done: false, value: 8 });
      expect(iterator.next()).toEqual({ done: false, value: 5 });
      expect(iterator.next()).toEqual({ done: false, value: 10 });
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should work with empty arrays in the inner iterable', () => {
      const iterator = createFlatMapIterator(syncArray, () => []);

      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should handle inner iterable being a single value', () => {
      const iterator = createFlatMapIterator(syncArray, (x) => [x * 2]);

      expect(iterator.next()).toEqual({ done: false, value: 2 });
      expect(iterator.next()).toEqual({ done: false, value: 4 });
      expect(iterator.next()).toEqual({ done: false, value: 6 });
      expect(iterator.next()).toEqual({ done: false, value: 8 });
      expect(iterator.next()).toEqual({ done: false, value: 10 });
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should handle nested iterables', () => {
      const iterator = createFlatMapIterator(syncArray, (x) => [[x, x * 2]]);

      expect(iterator.next()).toEqual({ done: false, value: [1, 2] });
      expect(iterator.next()).toEqual({ done: false, value: [2, 4] });
      expect(iterator.next()).toEqual({ done: false, value: [3, 6] });
      expect(iterator.next()).toEqual({ done: false, value: [4, 8] });
      expect(iterator.next()).toEqual({ done: false, value: [5, 10] });
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should work with strings', () => {
      const string = 'abc';
      const iterator = createFlatMapIterator(string, (char) => [
        char.toUpperCase(),
        char,
      ]);

      expect(iterator.next()).toEqual({ done: false, value: 'A' });
      expect(iterator.next()).toEqual({ done: false, value: 'a' });
      expect(iterator.next()).toEqual({ done: false, value: 'B' });
      expect(iterator.next()).toEqual({ done: false, value: 'b' });
      expect(iterator.next()).toEqual({ done: false, value: 'C' });
      expect(iterator.next()).toEqual({ done: false, value: 'c' });
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
      const iterator = createFlatMapIterator(syncArray, (x) => [x * 2]);

      expect(typeof iterator[Symbol.iterator]).toBe('function');
      expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should throw an error when the method gets a non-iterable argument', () => {
      const nonIterable = 123;
      const iterator = () => createFlatMapIterator(nonIterable, (x) => [x]);

      expect(iterator).toThrow(TypeError);
      expect(iterator).toThrow('first argument must be an iterable');
    });

    it('should throw an error when the method gets a non-function argument', () => {
      const iterator = () => createFlatMapIterator(syncArray, null);

      expect(iterator).toThrow(TypeError);
      expect(iterator).toThrow('second argument must be a function');
    });
  });

  describe('works with async iterators', () => {
    const asyncIterator = createAsyncIterator(asyncArray);

    it('should flatten and map each element of the iterable', async () => {
      const iterator = createFlatMapIterator(asyncIterator, (item) => [
        item,
        item * 2,
      ]);

      expect(await iterator.next()).toEqual({ done: false, value: 1 });
      expect(await iterator.next()).toEqual({ done: false, value: 2 });
      expect(await iterator.next()).toEqual({ done: false, value: 2 });
      expect(await iterator.next()).toEqual({ done: false, value: 4 });
      expect(await iterator.next()).toEqual({ done: false, value: 3 });
      expect(await iterator.next()).toEqual({ done: false, value: 6 });
      expect(await iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should work with empty arrays in the inner iterable', async () => {
      const iterator = createFlatMapIterator(asyncIterator, () => []);

      expect(await iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should handle inner iterable being a single value', async () => {
      const iterator = createFlatMapIterator(asyncIterator, (x) => [x * 2]);

      expect(await iterator.next()).toEqual({ done: false, value: 2 });
      expect(await iterator.next()).toEqual({ done: false, value: 4 });
      expect(await iterator.next()).toEqual({ done: false, value: 6 });
      expect(await iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should handle nested iterables', async () => {
      const iterator = createFlatMapIterator(asyncIterator, (x) => [
        [x, x * 2],
      ]);

      expect(await iterator.next()).toEqual({ done: false, value: [1, 2] });
      expect(await iterator.next()).toEqual({ done: false, value: [2, 4] });
      expect(await iterator.next()).toEqual({ done: false, value: [3, 6] });
      expect(await iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
      const iterator = createFlatMapIterator(asyncIterator, (x) => [x * 2]);

      expect(typeof iterator[Symbol.asyncIterator]).toBe('function');
      expect(iterator[Symbol.asyncIterator]()).toBe(iterator);
    });
  });
});
