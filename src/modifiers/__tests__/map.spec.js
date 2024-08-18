import { createMapIterator } from '../index.js';

describe('createMapIterator', () => {
    it('should apply a function to each element', () => {
        const array = [1, 2, 3];
        const iterator = createMapIterator(array, (item) => item * 2);

        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 6 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
        const emptyArray = [];
        const iterator = createMapIterator(emptyArray, (item) => item * 2);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createMapIterator(array, (item) => item * 2);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should work with different types of iterator', () => {
        const string = 'hello';
        const iterator = createMapIterator(string, (item) => item.toUpperCase());

        expect(iterator.next().value).toBe('H');
        expect(iterator.next().value).toBe('E');
        expect(iterator.next().value).toBe('L');
        expect(iterator.next().value).toBe('L');
        expect(iterator.next().value).toBe('O');
        expect(iterator.next().value).toBe(undefined);
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
        const nonIterable = 1;
        const iterator = () => createMapIterator(nonIterable, (item) => item * 2);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('first argument must be an iterable');
    });

    it('should throw an error, when the method gets a non function', () => {
        const array = [1, 2, 3];
        const iterator =  () => createMapIterator(array, null);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('second argument must be a function');
    });

})
