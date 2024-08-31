import { sum } from '../index.js';

describe('sum', () => {
  describe('should work with sync iterators', () => {
    it('should return the sum of the elements', () => {
      const array = [1, 2, 3, 4, 5];

      expect(sum(array)).toBe(15);
    });

    it('should return the sum of the elements with custom callback', () => {
      const array = [{ age: 30 }, { age: 45 }];

      expect(sum(array, (item) => item.age)).toBe(75);
    });

    it('should return with different types of iterators', () => {
      const set = new Set([1, 2, 3, 4, 5]);

      expect(sum(set)).toBe(15);
    });

    it('should return 0 if the iterator is empty', () => {
      const array = [];

      expect(sum(array)).toBe(0);
    });
  });

  describe('should work with async iterators', () => {
    it('should return the sum of the elements', async () => {
      async function* asyncIter() {
        yield 10;
        yield 20;
        yield 30;
      }

      expect(await sum(asyncIter())).toBe(60);
    });

    it('should return the sum of the elements with custom callback', async () => {
      async function* asyncIter() {
        yield { age: 5 };
        yield { age: 15 };
        yield { age: 25 };
      }

      expect(await sum(asyncIter(), (item) => item.age)).toBe(45);
    });

    it('should return 0 if the iterator is empty', async () => {
      async function* asyncIter() {}

      expect(await sum(asyncIter())).toBe(0);
    });
  });
});
