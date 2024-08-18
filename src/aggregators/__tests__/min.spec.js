import { min } from '../index.js';

describe('min', () => {
    it('should return a minimum with default callback', () => {
        const array = [1, 2, 3, 4, 5];
        expect(min(array)).toBe(1);
    });

    it('should return a minimum with a callback', () => {
        const ages = [
            { age: 30 },
            { age: 35 },
            { age: 45 },
        ];

        expect(min(ages, (item) => item.age)).toBe(30);
    });

    it('should return Infinity for an empty array', () => {
        expect(min([])).toBe(Infinity);
    });
});
