import { createConcatIterator } from '../index.js';

describe('createConcatIterator', () => {

    it('should correctly concatenate multiple synchronous iterators', () => {
        const iterable1 = [1, 2];
        const iterable2 = [3, 4];
        const iterable3 = [5, 6];

        const iterator = createConcatIterator(iterable1, iterable2, iterable3);
        const result = [...iterator];

        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    // Тест для пустых синхронных итераторов
    it('should handle empty synchronous iterators', () => {
        const iterable1 = [];
        const iterable2 = [3, 4];

        const iterator = createConcatIterator(iterable1, iterable2);
        const result = [...iterator];

        expect(result).toEqual([3, 4]);
    });

    // Тест для асинхронного итератора
    it('should correctly concatenate multiple asynchronous iterators', async () => {
        const iterable1 = {
            async *[Symbol.asyncIterator]() {
                yield 1;
                yield 2;
            },
        };
        const iterable2 = {
            async *[Symbol.asyncIterator]() {
                yield 3;
                yield 4;
            },
        };
        const iterable3 = {
            async *[Symbol.asyncIterator]() {
                yield 5;
                yield 6;
            },
        };

        const iterator = createConcatIterator(iterable1, iterable2, iterable3);

        const result = [];
        for await (const value of iterator) {
            result.push(value);
        }

        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    // Тест для смешанных типов итераторов (синхронные и асинхронные)
    it('should throw an error if mixed sync and async iterators are passed', () => {
        const iterable1 = [1, 2];
        const iterable2 = {
            async *[Symbol.asyncIterator]() {
                yield 3;
                yield 4;
            },
        };

        expect(() => {
            createConcatIterator(iterable1, iterable2);
        }).toThrow(TypeError);
    });

    // Тест для асинхронного итератора с пустыми итераторами
    it('should handle empty asynchronous iterators', async () => {
        const iterable1 = {
            async *[Symbol.asyncIterator]() {
                // Пустой итератор
            },
        };
        const iterable2 = {
            async *[Symbol.asyncIterator]() {
                yield 3;
                yield 4;
            },
        };

        const iterator = createConcatIterator(iterable1, iterable2);

        const result = [];
        for await (const value of iterator) {
            result.push(value);
        }

        expect(result).toEqual([3, 4]);
    });
});
