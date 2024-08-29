import { avg } from '../index.js';

describe('avg', () => {
  it('should return the average of all elements with a callback', () => {
    const data = [{ age: 30 }, { age: 25 }, { age: 35 }];
    expect(avg(data, (item) => item.age)).toBe(30);
  });

  it('should return 0 for an empty array', () => {
    expect(avg([])).toBe(0);
  });

  it('should work with default callback', () => {
    expect(avg([1, 2, 3, 4])).toBe(2.5);
  });
});
