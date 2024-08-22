import {
    createMapIterator,
    createFilterIterator,
    createDropIterator,
    createFlatMapIterator,
    createReverseIterator,
    createTakeIterator,
} from '../modifiers/index.js';
import {
    avg,
    max,
    min,
    reduce,
    sum,
} from '../aggregators/index.js';
import { DigitsIterable } from './DigitsIterable.js';
import { RangeIterable } from './RangeIterable.js';
import { ObjectIterable } from './ObjectIterable.js';

// interface Options {
//    digits?: boolean; для создания итератора по цифрам поразрядно
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

        if (!iterable[Symbol.iterator]) {
            this.createIterable(iterable, options);
        } else {
            this.iterable = iterable;
        }
    }

    [Symbol.iterator]() {
        return this.iterable[Symbol.iterator]();
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
        return new Iter8orBase(createMapIterator(this.iterable, fn));
    }

    filter(predicate) {
        return new Iter8orBase(createFilterIterator(this.iterable, predicate));
    }

    drop(n) {
        return new Iter8orBase(createDropIterator(this.iterable, n));
    }

    flatMap(fn) {
        return new Iter8orBase(createFlatMapIterator(this.iterable, fn));
    }

    reverse() {
        return new Iter8orBase(createReverseIterator(this.iterable));
    }

    take(n) {
        return new Iter8orBase(createTakeIterator(this.iterable, n));
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
