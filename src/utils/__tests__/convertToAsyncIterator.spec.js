import { convertToAsyncIterator } from '../convertToAsyncIterator.js';

describe('convertToAsyncIterator', () => {
  it('should return the original iterator if it is already async', async () => {
    const asyncIterable = {
      async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };

    const result = convertToAsyncIterator(asyncIterable);

    expect(result).toBe(asyncIterable);

    const collected = [];
    for await (const value of result) {
      collected.push(value);
    }

    expect(collected).toEqual([1, 2, 3]);
  });

  it('should convert sync iterator to async iterator', async () => {
    const syncIterable = [1, 2, 3];
    const asyncIterator = convertToAsyncIterator(syncIterable);

    const collected = [];
    for await (const value of asyncIterator) {
      collected.push(value);
    }

    expect(collected).toEqual([1, 2, 3]);
  });

  it('should resolve async functions within the iterator', async () => {
    const syncIterable = [async () => 1, async () => 2, async () => 3];
    const asyncIterator = convertToAsyncIterator(syncIterable);

    const collected = [];
    for await (const value of asyncIterator) {
      collected.push(value);
    }

    expect(collected).toEqual([1, 2, 3]);
  });

  it('should handle a mix of values and async functions', async () => {
    const syncIterable = [async () => 1, 2, async () => 3, 4];
    const asyncIterator = convertToAsyncIterator(syncIterable);

    const collected = [];
    for await (const value of asyncIterator) {
      collected.push(value);
    }

    expect(collected).toEqual([1, 2, 3, 4]);
  });

  it('should handle an empty iterable', async () => {
    const syncIterable = [];
    const asyncIterator = convertToAsyncIterator(syncIterable);

    const collected = [];
    for await (const value of asyncIterator) {
      collected.push(value);
    }

    expect(collected).toEqual([]);
  });

  it('should throw an error if the item is an invalid async function', async () => {
    const syncIterable = [
      async () => {
        throw new Error('Test error');
      },
      2,
    ];
    const asyncIterator = convertToAsyncIterator(syncIterable);

    await expect(async () => {
      const collected = [];
      for await (const value of asyncIterator) {
        collected.push(value);
      }
    }).rejects.toThrow('Test error');
  });

  test('should work with different iterator types', async () => {
    const set = new Set([1, 2, 3]);
    const asyncIterator = convertToAsyncIterator(set);

    const collected = [];
    for await (const value of asyncIterator) {
      collected.push(value);
    }

    expect(collected).toEqual([1, 2, 3]);
  });
});
