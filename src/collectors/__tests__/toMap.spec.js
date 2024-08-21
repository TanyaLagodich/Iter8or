import { toMap } from '../index.js';

describe('toMap', () => {
    it('should return the Map from the array', () => {
        const array = [1, 2, 3];
        const result = toMap(array);

        expect(result).toBeInstanceOf(Map);
        expect(result.size).toBe(3);
        expect(result.get(0)).toBe(1);
        expect(result.get(1)).toBe(2);
        expect(result.get(2)).toBe(3);
    });

    it('should return the Map from the string', () => {
        const array = 'hello world';
        const result = toMap(array);

        expect(result).toBeInstanceOf(Map);
        expect(result.size).toBe(11);
        expect(result.get(0)).toBe('h');
        expect(result.get(1)).toBe('e');
        expect(result.get(2)).toBe('l');
        expect(result.get(3)).toBe('l');
        expect(result.get(4)).toBe('o');
        expect(result.get(5)).toBe(' ');
        expect(result.get(6)).toBe('w');
        expect(result.get(7)).toBe('o');
        expect(result.get(8)).toBe('r');
        expect(result.get(9)).toBe('l');
        expect(result.get(10)).toBe('d');
    });
});
