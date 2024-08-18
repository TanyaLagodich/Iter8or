import { createFilterIterator } from '../index.js';

describe('createFilterIterator', () => {
    const predicate = (item) => item % 2 === 0;

    it('should correctly filter elements from the iterator according to the predicate', () => {
        const array = [1, 2, 3, 4, 5];
        const iterator = createFilterIterator(array, predicate);

        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
        const emptyArray = [];
        const iterator = createFilterIterator(emptyArray, predicate);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createFilterIterator(array, predicate);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should work with different types of iterator', () => {
        const string = 'HeLlO, WoRlD';
        const iterator = createFilterIterator(string, (item) => /[A-Z]/.test(item));

        expect(iterator.next().value).toBe('H');
        expect(iterator.next().value).toBe('L');
        expect(iterator.next().value).toBe('O');
        expect(iterator.next().value).toBe('W');
        expect(iterator.next().value).toBe('R');
        expect(iterator.next().value).toBe('D');
        expect(iterator.next().value).toBe(undefined);
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
        const nonIterable = 1;
        const iterator = () => createFilterIterator(nonIterable, (item) => item * 2);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('first argument must be an iterable');
    });

    it('should throw an error, when the method gets a non function', () => {
        const array = [1, 2, 3];
        const iterator =  () => createFilterIterator(array, null);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('second argument must be a function');
    });


});
