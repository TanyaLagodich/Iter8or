export default function createFilterIterator(iterable, predicate) {
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
    }
}
