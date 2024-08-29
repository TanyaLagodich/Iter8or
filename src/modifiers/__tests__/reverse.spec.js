import { createReverseIterator } from '../index.js';
import {
  syncArray,
  emptyArray,
  createAsyncIterator,
  asyncArray,
} from './__fixtures__/index.js';

describe('createReverseIterator', () => {
  describe('works with sync iterators', () => {
    it('should reverse an order in the iterator', () => {
      const reverseIterator = createReverseIterator(syncArray);

      expect(reverseIterator.next()).toEqual({ done: false, value: 5 });
      expect(reverseIterator.next()).toEqual({ done: false, value: 4 });
      expect(reverseIterator.next()).toEqual({ done: false, value: 3 });
      expect(reverseIterator.next()).toEqual({ done: false, value: 2 });
      expect(reverseIterator.next()).toEqual({ done: false, value: 1 });
      expect(reverseIterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
      const iterator = createReverseIterator(emptyArray);

      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
      const iterator = createReverseIterator(syncArray);

      expect(typeof iterator[Symbol.iterator]).toBe('function');
      expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should work with different types of iterator', () => {
      const string = 'hello';
      const iterator = createReverseIterator(string);

      expect(iterator.next().value).toBe('o');
      expect(iterator.next().value).toBe('l');
      expect(iterator.next().value).toBe('l');
      expect(iterator.next().value).toBe('e');
      expect(iterator.next().value).toBe('h');
      expect(iterator.next().value).toBe(undefined);
    });

    it('should work with a single element', () => {
      const array = [42];
      const iterator = createReverseIterator(array);

      expect(iterator.next()).toEqual({ done: false, value: 42 });
      expect(iterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
      const nonIterable = 1;
      const iterator = () =>
        createReverseIterator(nonIterable, (item) => item * 2);

      expect(iterator).toThrow(TypeError);
      expect(iterator).toThrow('the argument must be an iterable');
    });
  });

  describe('works with async iterators', () => {
    const asyncIterator = createAsyncIterator(asyncArray);

    it('should reverse an order in the iterator', async () => {
      const reverseIterator = createReverseIterator(asyncIterator);

      expect(await reverseIterator.next()).toEqual({ done: false, value: 3 });
      expect(await reverseIterator.next()).toEqual({ done: false, value: 2 });
      expect(await reverseIterator.next()).toEqual({ done: false, value: 1 });
      expect(await reverseIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should work with empty array', async () => {
      const asyncEmptyIterator = createAsyncIterator(emptyArray);
      const reverseIterator = createReverseIterator(asyncEmptyIterator);

      expect(await reverseIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should return an async iterator', () => {
      const reverseIterator = createReverseIterator(asyncIterator);

      expect(typeof reverseIterator[Symbol.asyncIterator]).toBe('function');
      expect(reverseIterator[Symbol.asyncIterator]()).toBe(reverseIterator);
    });
  });
});
