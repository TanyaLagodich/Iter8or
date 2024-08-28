import { createDropIterator } from '../index.js'
import {
    emptyArray,
    syncArray,
    asyncArray,
    createAsyncIterator,
} from './__fixtures__/index.js';

describe('createDropIterator', () => {
    describe('works with sync iterators', () => {
        it('should skip the first n elements', () => {
            const dropIterator = createDropIterator(syncArray, 3);

            expect(dropIterator.next()).toEqual({ done: false, value: 4 });
            expect(dropIterator.next()).toEqual({ done: false, value: 5 });
            expect(dropIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should return done: true, when n is equal or more than iterator\'s length', () => {
            const dropIterator = createDropIterator(syncArray, 5);

            expect(dropIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('shouldn\'t skip elements when the n is equal 0', () => {
            const dropIterator = createDropIterator(syncArray, 0);

            expect(dropIterator.next()).toEqual({ done: false, value: 1 });
            expect(dropIterator.next()).toEqual({ done: false, value: 2 });
            expect(dropIterator.next()).toEqual({ done: false, value: 3 });
            expect(dropIterator.next()).toEqual({ done: false, value: 4 });
            expect(dropIterator.next()).toEqual({ done: false, value: 5 });
            expect(dropIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with an empty iterator', () => {
            const dropIterator = createDropIterator(emptyArray, 3);

            expect(dropIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with different types of the iterator', () => {
            const string = 'hello';
            const dropIterator = createDropIterator(string, 3);

            expect(dropIterator.next()).toEqual({ done: false, value: 'l'});
            expect(dropIterator.next()).toEqual({ done: false, value: 'o'});
            expect(dropIterator.next()).toEqual({ done: true, value: undefined});
        });

        it('should return an iterator', () => {
            const dropIterator = createDropIterator(syncArray, 1);

            expect(typeof dropIterator[Symbol.iterator]).toBe('function');
            expect(dropIterator[Symbol.iterator]()).toBe(dropIterator);
        });

        it('should throw an error, when the method gets a non-iterable argument', () => {
            const nonIterable = 1;
            const dropIterator = () => createDropIterator(nonIterable, 2);

            expect(dropIterator).toThrow(TypeError);
            expect(dropIterator).toThrow('the argument must be an iterable');
        });
    });

    describe('works with async iterators', () => {
        const asyncIterator = createAsyncIterator(asyncArray);

        it('should skip the first n elements', async () => {
            const dropIterator = createDropIterator(asyncIterator, 1);

            expect(await dropIterator.next()).toEqual({ value: 2, done: false });
            expect(await dropIterator.next()).toEqual({ value: 3, done: false });
            expect(await dropIterator.next()).toEqual({ value: undefined, done: true });
        });

        it('should return done: true, when n is equal or more than iterator\'s length', async () => {
            const dropIterator = createDropIterator(asyncIterator, 5);

            expect(await dropIterator.next()).toEqual({ done: true, value: undefined });
        });


        it('shouldn\'t skip elements when the n is equal 0', async () => {
            const dropIterator = createDropIterator(asyncIterator, 0);

            expect(await dropIterator.next()).toEqual({ value: 1, done: false });
            expect(await dropIterator.next()).toEqual({ value: 2, done: false });
            expect(await dropIterator.next()).toEqual({ value: 3, done: false });
            expect(await dropIterator.next()).toEqual({ value: undefined, done: true });
        });

        it('should return an async iterator', () => {
            const dropIterator = createDropIterator(asyncIterator, 1);

            expect(typeof dropIterator[Symbol.asyncIterator]).toBe('function');
            expect(dropIterator[Symbol.asyncIterator]()).toBe(dropIterator);
        });

    });

});
