import { ObjectIterable } from '../ObjectIterable.js';

describe('ObjectIterable', () => {
  it('should iterate over object properties synchronously', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const iterable = new ObjectIterable(obj);
    const result = [...iterable];
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should handle empty object correctly', () => {
    const obj = {};
    const iterable = new ObjectIterable(obj);
    const result = [...iterable];
    expect(result).toEqual([]);
  });

  it('should iterate over object properties asynchronously', async () => {
    const obj = {
      a: 1,
      b: async () => 2,
      c: new Promise((resolve) => setTimeout(() => resolve(3), 10)),
    };
    const iterable = new ObjectIterable(obj);
    const result = [];
    for await (const [key, value] of iterable) {
      result.push([key, value]);
    }
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should handle mixed synchronous and asynchronous values', async () => {
    const obj = {
      a: 1,
      b: Promise.resolve(2),
      c: () => Promise.resolve(3),
    };
    const iterable = new ObjectIterable(obj);
    const result = [];
    for await (const [key, value] of iterable) {
      result.push([key, value]);
    }
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should handle functions that return non-promise values', async () => {
    const obj = {
      a: 1,
      b: () => 2,
      c: () => 3,
    };
    const iterable = new ObjectIterable(obj);
    const result = [];
    for await (const [key, value] of iterable) {
      result.push([key, value]);
    }
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should handle async functions that return promises', async () => {
    const obj = {
      a: 1,
      b: async () => Promise.resolve(2),
      c: async () => Promise.resolve(3),
    };
    const iterable = new ObjectIterable(obj);
    const result = [];
    for await (const [key, value] of iterable) {
      result.push([key, value]);
    }
    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });
});
