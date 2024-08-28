import { createFilterIterator } from '../index.js';
import {
    emptyArray,
    syncArray,
    asyncArray,
    createAsyncIterator,
} from './__fixtures__/index.js';

describe('createFilterIterator', () => {
    const predicate = (item) => item % 2 === 0;
    describe('works with sync iterators', () => {

        it('should correctly filter elements from the iterator according to the predicate', () => {
            const filterIterator = createFilterIterator(syncArray, predicate);

            expect(filterIterator.next()).toEqual({ done: false, value: 2 });
            expect(filterIterator.next()).toEqual({ done: false, value: 4 });
            expect(filterIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with empty array', () => {
            const filterIterator = createFilterIterator(emptyArray, predicate);

            expect(filterIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should return an iterator', () => {
            const filterIterator = createFilterIterator(syncArray, predicate);

            expect(typeof filterIterator[Symbol.iterator]).toBe('function');
            expect(filterIterator[Symbol.iterator]()).toBe(filterIterator);
        });

        it('should work with different types of iterator', () => {
            const string = 'HeLlO, WoRlD';
            const filterIterator = createFilterIterator(string, (item) => /[A-Z]/.test(item));

            expect(filterIterator.next().value).toBe('H');
            expect(filterIterator.next().value).toBe('L');
            expect(filterIterator.next().value).toBe('O');
            expect(filterIterator.next().value).toBe('W');
            expect(filterIterator.next().value).toBe('R');
            expect(filterIterator.next().value).toBe('D');
            expect(filterIterator.next().value).toBe(undefined);
        });

        it('should throw an error, when the method gets a non-iterable argument', () => {
            const nonIterable = 1;
            const filterIterator = () => createFilterIterator(nonIterable, (item) => item * 2);

            expect(filterIterator).toThrow(TypeError);
            expect(filterIterator).toThrow('first argument must be an iterable');
        });

        it('should throw an error, when the method gets a non function', () => {
            const filterIterator =  () => createFilterIterator(syncArray, null);

            expect(filterIterator).toThrow(TypeError);
            expect(filterIterator).toThrow('second argument must be a function');
        });
    });

    describe('works with async iterators', () => {
        const asyncIterator = createAsyncIterator(asyncArray);

        it('should correctly filter elements from the iterator according to the predicate', async () => {
            const filterIterator = createFilterIterator(asyncIterator, predicate);

            expect(await filterIterator.next()).toEqual({ done: false, value: 2 });
            expect(await filterIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with empty array', async () => {
            const emptyAsyncIterator = createAsyncIterator(emptyArray);
            const filterIterator = createFilterIterator(emptyAsyncIterator, predicate);

            expect(await filterIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should return an iterator', () => {
            const filterIterator = createFilterIterator(asyncIterator, predicate);

            expect(typeof filterIterator[Symbol.asyncIterator]).toBe('function');
            expect(filterIterator[Symbol.asyncIterator]()).toBe(filterIterator);
        });

    });

});
