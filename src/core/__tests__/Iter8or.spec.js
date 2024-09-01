import Iter8or from '../Iter8or.js';

describe('Iter8or class', () => {
  it('should map values correctly', () => {
    const iter = new Iter8or([1, 2, 3]);
    const mapped = iter.map((x) => x * 2);
    expect([...mapped]).toEqual([2, 4, 6]);
  });

  it('should filter values correctly', () => {
    const iter = new Iter8or([1, 2, 3, 4]);
    const filtered = iter.filter((x) => x % 2 === 0);
    expect([...filtered]).toEqual([2, 4]);
  });

  it('should drop values correctly', () => {
    const iter = new Iter8or([1, 2, 3, 4]);
    const dropped = iter.drop(2);
    expect([...dropped]).toEqual([3, 4]);
  });

  it('should flatMap values correctly', () => {
    const iter = new Iter8or([1, 2, 3]);
    const flatMapped = iter.flatMap((x) => [x, x * 2]);
    expect([...flatMapped]).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('should flatten values correctly', () => {
    const iter = new Iter8or([1, [2, [3, 4]]]);
    const flattened = iter.flat(2);
    expect([...flattened]).toEqual([1, 2, 3, 4]);
  });

  it('should reverse values correctly', () => {
    const iter = new Iter8or([1, 2, 3]);
    const reversed = iter.reverse();
    expect([...reversed]).toEqual([3, 2, 1]);
  });

  it('should take values correctly', () => {
    const iter = new Iter8or([1, 2, 3, 4]);
    const taken = iter.take(2);
    expect([...taken]).toEqual([1, 2]);
  });

  it('should concatenate iterators correctly', () => {
    const iter1 = new Iter8or([1, 2]);
    const iter2 = new Iter8or([3, 4]);
    const concatenated = iter1.concat(iter2);
    expect([...concatenated]).toEqual([1, 2, 3, 4]);
  });

  it('should calculate the average correctly', () => {
    const iter = new Iter8or([1, 2, 3]);
    const average = iter.avg();
    expect(average).toBe(2);
  });

  it('should calculate the sum correctly', () => {
    const iter = new Iter8or([1, 2, 3]);
    const totalSum = iter.sum();
    expect(totalSum).toBe(6);
  });

  it('should group by key correctly', () => {
    const iter = new Iter8or(['apple', 'banana', 'cherry']);
    const grouped = iter.groupBy((word) => word.length);
    expect(grouped).toEqual({ 5: ['apple'], 6: ['banana', 'cherry'] });
  });

  it('should partition values correctly', () => {
    const iter = new Iter8or([1, 2, 3, 4, 5]);
    const [evens, odds] = iter.partition((x) => x % 2 === 0);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });

  it('should collect values into an array correctly', () => {
    const iter = new Iter8or(new Set([1, 2, 3]));
    const array = iter.toArray();
    expect(array).toEqual([1, 2, 3]);
  });

  it('should collect key-value pairs into a Map correctly', () => {
    const iter = new Iter8or([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const map = iter.toMap();
    expect(map).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });

  it('should collect key-value pairs into an object correctly', () => {
    const iter = new Iter8or([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const obj = iter.toObject();
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should collect values into a Set correctly', () => {
    const iter = new Iter8or([1, 2, 2, 3, 4]);
    const set = iter.toSet();
    expect(set).toEqual(new Set([1, 2, 3, 4]));
  });

  it('should concatenate values into a string correctly', () => {
    const iter = new Iter8or(['H', 'e', 'l', 'l', 'o']);
    const str = iter.toString();
    expect(str).toBe('Hello');
  });
});
