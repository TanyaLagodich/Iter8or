import { max } from '../index.js';

describe('max', () => {
  describe('should work with sync iterators', () => {
    it('should return a maximum with default callback', () => {
      const array = [1, 2, 3, 4, 5];
      expect(max(array)).toBe(5);
    });

    it('should return a maximum with a callback', () => {
      const ages = [{ age: 30 }, { age: 35 }, { age: 45 }];

      expect(max(ages, (item) => item.age)).toBe(45);
    });

    it('should return -Infinity for an empty array', () => {
      expect(max([])).toBe(-Infinity);
    });
  });

  describe('should work with async iterators', () => {
    it('should return the average of all elements in an async iterable', async () => {
      async function* asyncIter() {
        yield 10;
        yield 20;
        yield 30;
      }
      const result = await max(asyncIter());
      expect(result).toBe(30);
    });

    it('should work with a callback in an async iterable', async () => {
      async function* asyncIter() {
        yield { value: 5 };
        yield { value: 15 };
        yield { value: 25 };
      }
      const result = await max(asyncIter(), (item) => item.value);
      expect(result).toBe(25);
    });

    it('should return 0 for an empty async iterable', async () => {
      async function* asyncIter() {}
      const result = await max(asyncIter());
      expect(result).toBe(-Infinity);
    });
  });
});
