import {
    createMapIterator,
    createFilterIterator,
    createDropIterator,
    createFlatMapIterator,
    createReverseIterator,
    createTakeIterator,
} from '../modifiers/index.js';

export default class Iter8orBase {
    constructor(iterable) {
        if (!iterable) {
            throw new TypeError('Iter8orBase must be an iterable');
        }

        this.iterable = iterable;
    }

    [Symbol.iterator]() {
        return this.iterable[Symbol.iterator]();
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

}
