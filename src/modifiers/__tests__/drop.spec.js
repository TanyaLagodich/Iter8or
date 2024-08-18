import { createDropIterator } from '../index.js'

describe('createDropIterator', () => {
    it('should skip the first n elements', () => {
        const array = [1, 2, 3, 4, 5];
        const iterator = createDropIterator(array, 3);

        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 5 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should return done: true, when n is equal or more than iterator\'s length', () => {
        const array = [1, 2, 3, 4, 5];
        const iterator = createDropIterator(array, 5);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('shouldn\'t skip elements when the n is equal 0', () => {
        const array = [1, 2, 3, 4, 5];
        const iterator = createDropIterator(array, 0);

        expect(iterator.next()).toStrictEqual({ done: false, value: 1 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 2 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 3 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 4 });
        expect(iterator.next()).toStrictEqual({ done: false, value: 5 });
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with an empty iterator', () => {
        const array = [];
        const iterator = createDropIterator(array, 3);

        expect(iterator.next()).toStrictEqual({ done: true, value: undefined });
    });

    it('should work with different types of the iterator', () => {
        const string = 'hello';
        const iterator = createDropIterator(string, 3);

        expect(iterator.next()).toStrictEqual({ done: false, value: 'l'});
        expect(iterator.next()).toStrictEqual({ done: false, value: 'o'});
        expect(iterator.next()).toStrictEqual({ done: true, value: undefined});
    });

    it('should return an iterator', () => {
        const array = [1, 2, 3];
        const iterator = createDropIterator(array, 1);

        expect(typeof iterator[Symbol.iterator]).toBe('function');
        expect(iterator[Symbol.iterator]()).toBe(iterator);
    });

    it('should throw an error, when the method gets a non-iterable argument', () => {
        const nonIterable = 1;
        const iterator = () => createDropIterator(nonIterable, 2);

        expect(iterator).toThrow(TypeError);
        expect(iterator).toThrow('the argument must be an iterable');
    });

});
