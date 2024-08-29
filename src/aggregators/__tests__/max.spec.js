import { max } from '../index.js';

describe('max', () => {
  it('should return a maximum with default callback', () => {
    const array = [1, 2, 3, 4, 5];
    expect(max(array)).toBe(5);
  });

  it('should return a maximum with a callback', () => {
    const ages = [{ age: 30 }, { age: 35 }, { age: 45 }];

    expect(max(ages, (item) => item.age)).toBe(45);
  });

  it('should return -Infinity for an empty array', () => {
    expect(max([])).toBe(-Infinity);
  });
});
