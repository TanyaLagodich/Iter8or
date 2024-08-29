import { createTakeIterator } from '../index.js';
import {
  asyncArray,
  createAsyncIterator,
  emptyArray,
  syncArray,
} from './__fixtures__/index.js';

describe('createTakeIterator', () => {
  describe('works with sync iterators', () => {
    it('should take only n elements from the iterator', () => {
      const takeIterator = createTakeIterator(syncArray, 2);

      expect(takeIterator.next()).toEqual({ done: false, value: 1 });
      expect(takeIterator.next()).toEqual({ done: false, value: 2 });
      expect(takeIterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
      const takeIterator = createTakeIterator(emptyArray, 3);

      expect(takeIterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
      const takeIterator = createTakeIterator(syncArray, 3);

      expect(typeof takeIterator[Symbol.iterator]).toBe('function');
      expect(takeIterator[Symbol.iterator]()).toBe(takeIterator);
    });

    it('should work with a `string` type of iterator', () => {
      const string = 'hello';
      const takeIterator = createTakeIterator(string, 3);

      expect(takeIterator.next().value).toBe('h');
      expect(takeIterator.next().value).toBe('e');
      expect(takeIterator.next().value).toBe('l');
      expect(takeIterator.next().value).toBe(undefined);
    });

    it('should work with a `Set` type of iterator', () => {
      const string = new Set('illuminating');
      const takeIterator = createTakeIterator(string, 3);

      expect(takeIterator.next().value).toBe('i');
      expect(takeIterator.next().value).toBe('l');
      expect(takeIterator.next().value).toBe('u');
      expect(takeIterator.next().value).toBe(undefined);
    });

    it('should work with a single element', () => {
      const array = [42];
      const takeIterator = createTakeIterator(array, 3);

      expect(takeIterator.next()).toEqual({ done: false, value: 42 });
      expect(takeIterator.next()).toEqual({ done: true, value: undefined });
    });

    it("should return all elements and then done: true when n is greater than or equal to the iterable's length", () => {
      const takeIterator = createTakeIterator(syncArray, 5);

      expect(takeIterator.next()).toEqual({ done: false, value: 1 });
      expect(takeIterator.next()).toEqual({ done: false, value: 2 });
      expect(takeIterator.next()).toEqual({ done: false, value: 3 });
      expect(takeIterator.next()).toEqual({ done: false, value: 4 });
      expect(takeIterator.next()).toEqual({ done: false, value: 5 });
      expect(takeIterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should handle very large n values without errors', () => {
      const takeIterator = createTakeIterator(
        syncArray,
        Number.MAX_SAFE_INTEGER
      );

      expect(takeIterator.next()).toEqual({ done: false, value: 1 });
      expect(takeIterator.next()).toEqual({ done: false, value: 2 });
      expect(takeIterator.next()).toEqual({ done: false, value: 3 });
      expect(takeIterator.next()).toEqual({ done: false, value: 4 });
      expect(takeIterator.next()).toEqual({ done: false, value: 5 });
      expect(takeIterator.next()).toEqual({ done: true, value: undefined });
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
      const nonIterable = 1;
      const takeIterator = () => createTakeIterator(nonIterable, 5);

      expect(takeIterator).toThrow(TypeError);
      expect(takeIterator).toThrow('first argument must be an iterable');
    });
  });

  describe('works with async iterators', () => {
    const asyncIterator = createAsyncIterator(asyncArray);

    it('should take only n elements from the iterator', async () => {
      const takeIterator = createTakeIterator(asyncIterator, 2);

      expect(await takeIterator.next()).toEqual({ done: false, value: 1 });
      expect(await takeIterator.next()).toEqual({ done: false, value: 2 });
      expect(await takeIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should work with empty array', async () => {
      const asyncEmptyIterator = createAsyncIterator(emptyArray);
      const takeIterator = createTakeIterator(asyncEmptyIterator, 3);

      expect(await takeIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });

    it('should return an iterator', () => {
      const takeIterator = createTakeIterator(asyncIterator, 3);

      expect(typeof takeIterator[Symbol.asyncIterator]).toBe('function');
      expect(takeIterator[Symbol.asyncIterator]()).toBe(takeIterator);
    });

    it("should return all elements and then done: true when n is greater than or equal to the iterable's length", async () => {
      const takeIterator = createTakeIterator(asyncIterator, 5);

      expect(await takeIterator.next()).toEqual({ done: false, value: 1 });
      expect(await takeIterator.next()).toEqual({ done: false, value: 2 });
      expect(await takeIterator.next()).toEqual({ done: false, value: 3 });
      expect(await takeIterator.next()).toEqual({
        done: true,
        value: undefined,
      });
    });
  });
});
