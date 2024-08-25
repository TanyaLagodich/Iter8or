const createSyncFilterIterator = (iterable, predicate) => {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('first argument must be an iterable');
    }

    if (typeof predicate !== 'function') {
        throw new TypeError('second argument must be a function');
    }

    const iterator = iterable[Symbol.iterator]();

    return {
        next() {
            while (true) {
                const { value, done } = iterator.next();
                if (done || predicate(value)) {
                    return { value, done };
                }
            }
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const createAsyncFilterIterator = (iterable, predicate) => {
    if (!iterable[Symbol.asyncIterator]) {
        throw new TypeError('first argument must be an async iterable');
    }

    if (typeof predicate !== 'function') {
        throw new TypeError('second argument must be a function');
    }

    const iterator = iterable[Symbol.asyncIterator]();

    return {
        async next() {
            while (true) {
                const { value, done } = await iterator.next();
                if (done || predicate(value)) {
                    return { value, done };
                }
            }
        },
        [Symbol.asyncIterator]() {
            return this;
        }
    };
};

export default function createFilterIterator(iterable, predicate) {
    return typeof iterable[Symbol.asyncIterator] === 'function'
        ? createAsyncFilterIterator(iterable, predicate)
        : createSyncFilterIterator(iterable, predicate);
}
