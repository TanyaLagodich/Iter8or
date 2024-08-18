import { createFlatMapIterator } from '../index.js';

describe('createFlatMapIterator', () => {
    it('should flatten and map each element of the iterable', () => {
        const array = [1, 2, 3];
        const iterator = createFlatMapIterator(array, x => [x, x * 2]);

        expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 3 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 6 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with empty arrays in the inner iterable', () => {
        const array = [1, 2, 3];
        const iterator = createFlatMapIterator(array, x => []);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should handle inner iterable being a single value', () => {
        const array = [1, 2, 3];
        const iterator = createFlatMapIterator(array, x => [x * 2]);

        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 6 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should handle nested iterables', () => {
        const array = [1, 2];
        const iterator = createFlatMapIterator(array, x => [[x, x * 2]]);

        expect(iterator.next()).toStrictEqual({ done: false, value: [1, 2] });
        expect(iterator.next()).toStrictEqual({ done: false, value: [2, 4] });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with strings', () => {
        const string = 'abc';
        const iterator = createFlatMapIterator(string, char => [char.toUpperCase(), char]);

        expect(iterator.next()).toStrictEqual({ done: false, value: 'A' });
        expect(iterator.next()).toStrictEqual({ done: false, value: 'a' });
        expect(iterator.next()).toStrictEqual({ done: false, value: 'B' });
        expect(iterator.next()).toStrictEqual({ done: false, value: 'b' });
        expect(iterator.next()).toStrictEqual({ done: false, value: 'C' });
        expect(iterator.next()).toStrictEqual({ done: false, value: 'c' });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createFlatMapIterator(array, x => [x * 2]);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should throw an error when the method gets a non-iterable argument', () => {
        const nonIterable = 123;
        const iterator = () => createFlatMapIterator(nonIterable, x => [x]);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('first argument must be an iterable');
    });

    it('should throw an error when the method gets a non-function argument', () => {
        const array = [1, 2, 3];
        const iterator = () => createFlatMapIterator(array, null);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('second argument must be a function');
    });
});
