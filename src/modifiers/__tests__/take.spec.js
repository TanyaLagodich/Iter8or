import { createTakeIterator } from '../index.js';

describe('createTakeIterator', () => {
    it('should take only n elements from the iterator', () => {
        const array = [1, 2, 3];
        const iterator = createTakeIterator(array, 2);

        expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
        const emptyArray = [];
        const iterator = createTakeIterator(emptyArray, 3);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createTakeIterator(array, 3);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should work with a `string` type of iterator', () => {
        const string = 'hello';
        const iterator = createTakeIterator(string, 3);

        expect(iterator.next().value).toBe('h');
        expect(iterator.next().value).toBe('e');
        expect(iterator.next().value).toBe('l');
        expect(iterator.next().value).toBe(undefined);
    });

    it('should work with a `Set` type of iterator', () => {
        const string = new Set('illuminating');
        const iterator = createTakeIterator(string, 3);

        expect(iterator.next().value).toBe('i');
        expect(iterator.next().value).toBe('l');
        expect(iterator.next().value).toBe('u');
        expect(iterator.next().value).toBe(undefined);
    });

    it('should work with a single element', () => {
        const array = [42];
        const iterator = createTakeIterator(array, 3);

        expect(iterator.next()).toStrictEqual({ done: false, value: 42 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return all elements and then done: true when n is greater than or equal to the iterable\'s length', () => {
        const array = [1, 2, 3];
        const iterator = createTakeIterator(array, 5);

        expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 3 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should handle very large n values without errors', () => {
        const array = [1, 2, 3];
        const iterator = createTakeIterator(array, Number.MAX_SAFE_INTEGER);

        expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 3 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
        const nonIterable = 1;
        const iterator = () => createTakeIterator(nonIterable, 5);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('first argument must be an iterable');
    });
});
