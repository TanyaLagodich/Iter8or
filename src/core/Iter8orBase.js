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
                this.iterable = this.convertArrayToAsyncIterable(iterable);
            } else {
                this.iterable = iterable;
            }
        }
    }

    [Symbol.iterator]() {
        if (this.options.async) {
            throw new TypeError('This is an async iterable. Use Symbol.asyncIterator instead.');
        }
        return this.iterable[Symbol.iterator]();
    }

    [Symbol.asyncIterator]() {
        if (!this.options.async) {
            throw new TypeError('This is a sync iterable. Use Symbol.iterator instead.');
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

    convertArrayToAsyncIterable(array) {
        const self = this;
        return {
            [Symbol.asyncIterator]() {
                let index = 0;

                return {
                    async next() {
                        if (index < array.length) {
                            const value = await self.resolveItem(array[index]);
                            index++;
                            return { value, done: false };
                        } else {
                            return { value: undefined, done: true };
                        }
                    }
                };
            }
        };
    }

    async resolveItem(item) {
        if (typeof item === 'function') {
            return await item();
        }
        return await item;
    }

    map(fn) {
        return new Iter8orBase(createMapIterator(this.iterable, fn), this.options);
    }

    filter(predicate) {
        return new this.constructor(createFilterIterator(this.iterable, predicate));
    }

    drop(n) {
        return new this.constructor(createDropIterator(this.iterable, n));
    }

    flatMap(fn) {
        return new this.constructor(createFlatMapIterator(this.iterable, fn));
    }

    reverse() {
        return new this.constructor(createReverseIterator(this.iterable));
    }

    take(n) {
        return new this.constructor(createTakeIterator(this.iterable, n));
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

// const array = [1, 2, 3];
//
// console.log([...new Iter8orBase(array).map(i => i + 1)])


const asyncIter = new Iter8orBase([
    () => Promise.resolve(1),
    () => new Promise(resolve => setTimeout(() => resolve(2), 1000)),
    Promise.resolve(3),
], { async: true });

console.log([...asyncIter])
//
//
// (async () => {
//     for await (const value of asyncIter.map(i => i + 1)) {
//         console.log('value', value); // 2, 4, 6
//     }
// })();



