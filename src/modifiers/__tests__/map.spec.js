import { createMapIterator } from '../index.js';
import {syncArray, emptyArray, createAsyncIterator, asyncArray} from './__fixtures__/index.js';

describe('createMapIterator', () => {
    describe('works with sync iterators', () => {
        it('should apply a function to each element', () => {
            const mapIterator = createMapIterator(syncArray, (item) => item * 2);

            expect(mapIterator.next()).toEqual({ done: false, value: 2 });
            expect(mapIterator.next()).toEqual({ done: false, value: 4 });
            expect(mapIterator.next()).toEqual({ done: false, value: 6 });
            expect(mapIterator.next()).toEqual({ done: false, value: 8 });
            expect(mapIterator.next()).toEqual({ done: false, value: 10 });
            expect(mapIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with empty array', () => {
            const mapIterator = createMapIterator(emptyArray, (item) => item * 2);

            expect(mapIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should return an iterator', () => {
            const mapIterator = createMapIterator(syncArray, (item) => item * 2);

            expect(typeof mapIterator[Symbol.iterator]).toBe('function');
            expect(mapIterator[Symbol.iterator]()).toBe(mapIterator);
        });

        it('should work with different types of iterator', () => {
            const string = 'hello';
            const mapIterator = createMapIterator(string, (item) => item.toUpperCase());

            expect(mapIterator.next().value).toBe('H');
            expect(mapIterator.next().value).toBe('E');
            expect(mapIterator.next().value).toBe('L');
            expect(mapIterator.next().value).toBe('L');
            expect(mapIterator.next().value).toBe('O');
            expect(mapIterator.next().value).toBe(undefined);
        });

        it('should throw an error, when the method gets a non-iterable argument', () => {
            const nonIterable = 1;
            const mapIterator = () => createMapIterator(nonIterable, (item) => item * 2);

            expect(mapIterator).toThrow(TypeError);
            expect(mapIterator).toThrow('first argument must be an iterable');
        });

        it('should throw an error, when the method gets a non function', () => {
            const mapIterator =  () => createMapIterator(syncArray, null);

            expect(mapIterator).toThrow(TypeError);
            expect(mapIterator).toThrow('second argument must be a function');
        });
    });

    describe('works with async iterators', () => {
        const asyncIterator = createAsyncIterator(asyncArray);

        it('should apply a function to each element', async () => {
            const mapIterator = createMapIterator(asyncIterator, (item) => item * 2);

            expect(await mapIterator.next()).toEqual({ done: false, value: 2 });
            expect(await mapIterator.next()).toEqual({ done: false, value: 4 });
            expect(await mapIterator.next()).toEqual({ done: false, value: 6 });
            expect(await mapIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should work with empty array', async () => {
            const asyncEmptyIterator = createAsyncIterator(emptyArray);
            const mapIterator = createMapIterator(asyncEmptyIterator, (item) => item * 2);

            expect(await mapIterator.next()).toEqual({ done: true, value: undefined });
        });

        it('should return an iterator', () => {
            const mapIterator = createMapIterator(asyncIterator, (item) => item * 2);

            expect(typeof mapIterator[Symbol.asyncIterator]).toBe('function');
            expect(mapIterator[Symbol.asyncIterator]()).toBe(mapIterator);
        });

    });
})
