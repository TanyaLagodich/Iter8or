const createSyncDropIterator = (iterable, n) => {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('the argument must be an iterable');
    }

    const iterator = iterable[Symbol.iterator]();
    let count = 0;

    return {
        next() {
            while (count < n) {
                iterator.next();
                count++;
            }
            return iterator.next();
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}

const createAsyncDropIterator = (iterable, n) => {
    if (!iterable[Symbol.asyncIterator]) {
        throw new TypeError('the argument must be an iterable');
    }

    const iterator = iterable[Symbol.asyncIterator]();
    let count = 0;

    return {
        async next() {
            while (count < n) {
                await iterator.next();
                count++;
            }
            return iterator.next();
        },
        [Symbol.asyncIterator]() {
            return this;
        }
    }
}

export default function createDropIterator(iterable, predicate) {
    return typeof iterable[Symbol.asyncIterator] === 'function'
        ? createAsyncDropIterator(iterable, predicate)
        : createSyncDropIterator(iterable, predicate);
}
