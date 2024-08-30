import {
  createMapIterator,
  createFilterIterator,
  createDropIterator,
  createConcatIterator,
  createFlatMapIterator,
  createReverseIterator,
  createTakeIterator,
  createFlatIterator,
} from '../modifiers/index.js';
import { avg, max, min, reduce, sum } from '../aggregators/index.js';
import { DigitsIterable } from './DigitsIterable.js';
import { RangeIterable } from './RangeIterable.js';
import { ObjectIterable } from './ObjectIterable.js';
import { convertToAsyncIterator } from '../utils/convertToAsyncIterator.js';

// interface Options {
//    digits?: boolean; для создания итератора по цифрам поразрядно
//    async?: boolean; для асинхронного итератора
// }
export default class Iter8orBase {
  constructor(iterable, options = {}) {
    if (iterable === null || iterable === undefined) {
      throw new TypeError('Cannot create an iterable from null or undefined.');
    }

    if (typeof iterable === 'boolean') {
      throw new TypeError('Cannot create an iterable from a boolean.');
    }

    if (typeof iterable === 'function') {
      throw new TypeError('Cannot create an iterable from a function.');
    }

    this.options = options;

    if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
      this.createIterable(iterable, options);
    } else {
      if (this.options.async && !iterable[Symbol.asyncIterator]) {
        this.iterable = convertToAsyncIterator(iterable);
      } else {
        this.iterable = iterable;
      }
    }
  }

  [Symbol.iterator]() {
    if (this.options.async) {
      throw new TypeError(
        'This is a async iterable. Use Symbol.asyncIterator instead.'
      );
    } else {
      return this.iterable[Symbol.iterator]();
    }
  }

  [Symbol.asyncIterator]() {
    if (!this.options.async) {
      throw new TypeError(
        'This is a sync iterable. Use Symbol.iterator instead.'
      );
    }

    return this.iterable[Symbol.asyncIterator]();
  }

  createIterable(iterable) {
    if (typeof iterable === 'number') {
      if (this.options.digits) {
        this.iterable = new DigitsIterable(iterable);
      } else {
        this.iterable = new RangeIterable(iterable);
      }
    } else if (typeof iterable === 'object' && iterable !== null) {
      this.iterable = new ObjectIterable(iterable);
    } else {
      throw new TypeError('Unsupported iterable type.');
    }
  }

  map(fn) {
    return new Iter8orBase(createMapIterator(this.iterable, fn), this.options);
  }

  filter(predicate) {
    return new Iter8orBase(
      createFilterIterator(this.iterable, predicate),
      this.options
    );
  }

  drop(n) {
    return new Iter8orBase(createDropIterator(this.iterable, n), this.options);
  }

  flatMap(fn) {
    return new Iter8orBase(
      createFlatMapIterator(this.iterable, fn),
      this.options
    );
  }

  flat(depth) {
    return new Iter8orBase(
      createFlatIterator(this.iterable, depth),
      this.options
    );
  }

  reverse() {
    return new Iter8orBase(createReverseIterator(this.iterable), this.options);
  }

  take(n) {
    return new Iter8orBase(createTakeIterator(this.iterable, n), this.options);
  }

  concat(...iterators) {
    if (!iterators.some(iterator => iterator instanceof Iter8orBase)) {
      throw new Error('All concatted iterators must be an Iter8orBase.');
    }
    return new Iter8orBase(createConcatIterator(this.iterable, iterators), this.options);
  }

  avg(fn) {
    return avg(this.iterable, fn);
  }

  max(fn) {
    return max(this.iterable, fn);
  }

  min(fn) {
    return min(this.iterable, fn);
  }

  reduce(reducer, initialValue) {
    return reduce(this.iterable, reducer, initialValue);
  }

  sum(fn) {
    return sum(this.iterable, fn);
  }
}

const iterator1 = new Iter8orBase([0, 1, [2, [3, [4, 5]]]]);
const iterator2 = new Iter8orBase([4, 5, 6]);
const iterator3 = new Iter8orBase([7, 8, 9]);

// console.log([...iterator1.flat(Infinity)])
//
// const concated = iterator1.concat(iterator2, iterator3);
// console.log([...concated.flat(Infinity)]);
// console.log(concated.flatMap(i => [i, i * 2]));
// console.log([...iterator1.flatMap(i => [i, i * 2])])

// for (const item of iterator1.flatMap(i => [i, i * 2])) {
//   console.log(item);
// }

const asyncIterator1 = new Iter8orBase(
  [
    async () => 1,
    [async () => 2, async () => 3],
  ],
  { async: true }
);

const asyncIterator2 = new Iter8orBase(
    [
      async () => 7,
      [async () => 8, async () => 9],
    ],
    { async: true }
);

async function forOf() {
  for await (const value of asyncIterator1.concat(asyncIterator2)) {
    // console.log(value);
  }
}

// await forOf();

console.log(asyncIterator1.concat(asyncIterator2));
