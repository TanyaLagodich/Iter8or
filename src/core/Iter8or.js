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
import {
  groupBy,
  partition,
  toArray,
  toMap,
  toObject,
  toSet,
  toString,
} from '../collectors/index.js';

export default class Iter8or {
  constructor(iterable, options = {}) {
    if (iterable === null || iterable === undefined) {
      throw new TypeError('Cannot create an iterable from null or undefined.');
    }

    if (typeof iterable === 'boolean') {
      throw new TypeError('Cannot create an iterable from a boolean.');
    }

    if (typeof iterable === 'function') {
      iterable = iterable();

      if (
        !iterable ||
        (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator])
      ) {
        throw new TypeError('Cannot create an iterable from a function.');
      }
    }

    this.options = options;

    if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
      this.#createIterable(iterable, options);
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
      const iterator = this.iterable[Symbol.iterator]();
      const stack = [iterator];

      return {
        next() {
          while (stack.length > 0) {
            const currentIterator = stack[stack.length - 1];
            const { done, value } = currentIterator.next();

            if (done) {
              stack.pop();
              continue;
            }

            if (
              value &&
              (typeof value[Symbol.iterator] === 'function' ||
                typeof value[Symbol.asyncIterator] === 'function')
            ) {
              stack.push(value);
              continue;
            }

            return { done: false, value };
          }

          return { done: true, value: undefined };
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    }
  }

  [Symbol.asyncIterator]() {
    if (!this.options.async) {
      throw new TypeError(
        'This is a sync iterable. Use Symbol.iterator instead.'
      );
    }

    const iterator = this.iterable[Symbol.asyncIterator]();
    const stack = [iterator]; // Стек для хранения текущих итераторов
    return {
      async next() {
        while (stack.length > 0) {
          const currentIterator = stack[stack.length - 1];
          const { done, value } = await currentIterator.next();

          if (done) {
            stack.pop();
            continue;
          }

          if (
            (value && typeof value[Symbol.asyncIterator] === 'function') ||
            typeof value[Symbol.iterator] === 'function'
          ) {
            stack.push(value);
            continue;
          }

          return { done: false, value };
        }

        return { done: true, value: undefined };
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }

  next() {
    if (!this.iterator) {
      this.iterator = this.options.async
        ? this[Symbol.asyncIterator]()
        : this[Symbol.iterator]();
    }
    return this.iterator.next();
  }

  #createIterable(iterable) {
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
    return new Iter8or(createMapIterator(this.iterable, fn), this.options);
  }

  filter(predicate) {
    return new Iter8or(
      createFilterIterator(this.iterable, predicate),
      this.options
    );
  }

  drop(n) {
    return new Iter8or(createDropIterator(this.iterable, n), this.options);
  }

  flatMap(fn) {
    return new Iter8or(createFlatMapIterator(this.iterable, fn), this.options);
  }

  flat(depth) {
    return new Iter8or(createFlatIterator(this.iterable, depth), this.options);
  }

  reverse() {
    return new Iter8or(createReverseIterator(this.iterable), this.options);
  }

  take(n) {
    return new Iter8or(createTakeIterator(this.iterable, n), this.options);
  }

  concat(...iterators) {
    if (!iterators.some((iterator) => iterator instanceof Iter8or)) {
      throw new Error('All concatted iterators must be an Iter8or.');
    }
    return new Iter8or(
      createConcatIterator(
        this.iterable,
        ...iterators.map((iterator) => iterator.iterable)
      ),
      this.options
    );
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

  groupBy(grouper) {
    return groupBy(this.iterable, grouper);
  }

  partition(predicate) {
    return partition(this.iterable, predicate);
  }

  toArray() {
    return toArray(this.iterable);
  }

  toMap() {
    return toMap(this.iterable);
  }

  toObject() {
    return toObject(this.iterable);
  }

  toSet() {
    return toSet(this.iterable);
  }

  toString() {
    return toString(this.iterable);
  }
}
