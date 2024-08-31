import { avg } from '../index.js';

describe('avg', () => {
  describe('should work with sync iterators', () => {
    it('should return the average of all elements with a callback', () => {
      const data = [{ age: 30 }, { age: 25 }, { age: 35 }];
      expect(avg(data, (item) => item.age)).toBe(30);
    });

    it('should return 0 for an empty array', () => {
      expect(avg([])).toBe(0);
    });

    it('should work with default callback', () => {
      expect(avg([1, 2, 3, 4])).toBe(2.5);
    });
  });

  describe('should work with async iterators', () => {
    it('should return the average of all elements in an async iterable', async () => {
      async function* asyncIter() {
        yield 10;
        yield 20;
        yield 30;
      }
      const result = await avg(asyncIter());
      expect(result).toBe(20);
    });

    it('should work with a callback in an async iterable', async () => {
      async function* asyncIter() {
        yield { value: 5 };
        yield { value: 15 };
        yield { value: 25 };
      }
      const result = await avg(asyncIter(), (item) => item.value);
      expect(result).toBe(15);
    });

    it('should return 0 for an empty async iterable', async () => {
      async function* asyncIter() {}
      const result = await avg(asyncIter());
      expect(result).toBe(0);
    });
  });
});
