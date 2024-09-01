import toObject from '../toObject.js';

describe('toObject', () => {
    describe('works with sync iterators', () => {
        it('should correctly convert iterable of key-value pairs to an object', () => {
            const iterable = [['a', 1], ['b', 2], ['c', 3]];
            const result = toObject(iterable);
            expect(result).toEqual({ a: 1, b: 2, c: 3 });
        });

        it('should correctly convert iterable of values to an object with indexes as keys', () => {
            const iterable = ['a', 'b', 'c'];
            const result = toObject(iterable);
            expect(result).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
        });

        it('should correctly handle iterable with mixed key-value pairs and values', () => {
            const iterable = [['a', 1], 'b', ['c', 3], 'd'];
            const result = toObject(iterable);
            expect(result).toEqual({ a: 1, 0: 'b', c: 3, 1: 'd' });
        });
    });

    describe('works with async iterators', () => {
        it('should correctly convert iterable of key-value pairs to an object', async () => {
            const asyncIterable = {
                async *[Symbol.asyncIterator]() {
                    yield ['a', 1];
                    yield ['b', 2];
                    yield ['c', 3];
                },
            };
            const result = await toObject(asyncIterable);
            expect(result).toEqual({ a: 1, b: 2, c: 3 });
        });

        it('should correctly convert iterable of values to an object with indexes as keys', async () => {
            const asyncIterable = {
                async *[Symbol.asyncIterator]() {
                    yield 'a';
                    yield 'b';
                    yield 'c';
                },
            };
            const result = await toObject(asyncIterable);
            expect(result).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
        });

        it('should correctly handle iterable with mixed key-value pairs and values', async () => {
            const asyncIterable = {
                async *[Symbol.asyncIterator]() {
                    yield ['a', 1];
                    yield 'b';
                    yield ['c', 3];
                    yield 'd';
                },
            };
            const result = await toObject(asyncIterable);
            expect(result).toEqual({ a: 1, 0: 'b', c: 3, 1: 'd' });
        });

        it('should throw a TypeError if the argument is not iterable', () => {
            expect(() => toObject(123)).toThrow(TypeError);
            expect(() => toObject(123)).toThrow('The argument must be iterable');
        });
    });
});
