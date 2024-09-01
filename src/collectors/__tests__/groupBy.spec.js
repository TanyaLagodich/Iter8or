import { groupBy } from '../index.js';

describe('groupBy', () => {
    describe('works with sync iterators', () => {
        it('should group iterable by string length', () => {
            const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
            const groupByLength = (word) => word.length;

            const grouped = groupBy(words, groupByLength);

            expect(grouped).toEqual({
                3: ['fig'],
                4: ['date'],
                5: ['apple', 'grape'],
                6: ['banana', 'cherry']
            });
        });

        it('should group iterable by the first letter', () => {
            const words = ['apple', 'banana', 'avocado', 'blueberry', 'cherry'];
            const groupByFirstLetter = (word) => word[0];

            const grouped = groupBy(words, groupByFirstLetter);

            expect(grouped).toEqual({
                a: ['apple', 'avocado'],
                b: ['banana', 'blueberry'],
                c: ['cherry']
            });
        });

        it('should group iterable of objects by a property', () => {
            const people = [
                { name: 'Alice', age: 25 },
                { name: 'Bob', age: 17 },
                { name: 'Charlie', age: 30 },
                { name: 'David', age: 25 }
            ];
            const groupByAge = (person) => person.age;

            const grouped = groupBy(people, groupByAge);

            expect(grouped).toEqual({
                17: [{ name: 'Bob', age: 17 }],
                25: [{ name: 'Alice', age: 25 }, { name: 'David', age: 25 }],
                30: [{ name: 'Charlie', age: 30 }]
            });
        });
    });

    describe('works with async iterators', () => {
        it('should group iterable by string length', async () => {
            const asyncIterable = {
                async *[Symbol.asyncIterator]() {
                    yield 'apple';
                    yield 'banana';
                    yield 'cherry';
                    yield 'date';
                    yield 'fig';
                    yield 'grape';
                },
            };
            const groupByLength = (word) => word.length;

            const grouped = await groupBy(asyncIterable, groupByLength);

            expect(grouped).toEqual({
                3: ['fig'],
                4: ['date'],
                5: ['apple', 'grape'],
                6: ['banana', 'cherry']
            });
        });

        it('should throw a TypeError if the argument is not iterable', () => {
            expect(() => groupBy(123, (n) => n)).toThrow(TypeError);
        });
    });
});
