import { reduce } from '../index.js';

describe('reduce', () => {
  const reducer = (acc, value) => acc + value;

  describe('should work with sync iterators', () => {
    it('should return the initial state when the iterator is empty', () => {
      const emptyArray = [];

      expect(reduce(emptyArray, reducer)).toBe(0);
    });

    it('should return the accumulated value', () => {
      const array = [1, 2, 3, 4, 5];

      expect(reduce(array, reducer)).toBe(15);
    });

    it("should throw a error when reducer isn't a function", () => {
      const array = [1, 2, 3, 4, 5];

      expect(() => reduce(array, 5)).toThrow(TypeError);
      expect(() => reduce(array, 5)).toThrow(
        'The reducer argument must be a function'
      );
    });

    it("should throw a error when reducer isn't provided", () => {
      const array = [1, 2, 3, 4, 5];

      expect(() => reduce(array)).toThrow(TypeError);
      expect(() => reduce(array)).toThrow(
        'The reducer argument must be provided'
      );
    });
  });

  describe('should work with async iterators', () => {
    it('should return the initial state when the iterator is empty', async () => {
      async function* asyncIter() {}

      expect(await reduce(asyncIter(), reducer)).toBe(0);
    });

    it('should return the accumulated value', async () => {
      async function* asyncIter() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      }

      expect(await reduce(asyncIter(), reducer)).toBe(15);
    });

    it("should throw a error when reducer isn't a function", async () => {
      async function* asyncIter() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
      }

      expect(() => reduce(asyncIter(), 5)).toThrow(TypeError);
      expect(() => reduce(asyncIter(), 5)).toThrow(
        'The reducer argument must be a function'
      );
    });
  });
});
