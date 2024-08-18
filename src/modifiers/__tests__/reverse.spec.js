import { createReverseIterator } from '../index.js';

describe('createReverseIterator', () => {
    it('should reverse an order in the iterator', () => {
       const array = [1, 2, 3, 4, 5];
       const iterator = createReverseIterator(array);

       expect(iterator.next()).toStrictEqual({ done: false, value: 5 });
       expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
       expect(iterator.next()).toStrictEqual({ done: false, value: 3 });
       expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
       expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
       expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with empty array', () => {
        const emptyArray = [];
        const iterator = createReverseIterator(emptyArray);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createReverseIterator(array);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should work with different types of iterator', () => {
        const string = 'hello';
        const iterator = createReverseIterator(string);

        expect(iterator.next().value).toBe('o');
        expect(iterator.next().value).toBe('l');
        expect(iterator.next().value).toBe('l');
        expect(iterator.next().value).toBe('e');
        expect(iterator.next().value).toBe('h');
        expect(iterator.next().value).toBe(undefined);
    });

    it('should work with a single element', () => {
        const array = [42];
        const iterator = createReverseIterator(array);

        expect(iterator.next()).toStrictEqual({ done: false, value: 42 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
        const nonIterable = 1;
        const iterator = () => createReverseIterator(nonIterable, (item) => item * 2);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('the argument must be an iterable');
    });
});
