export default function createFlatMapIterator(iterable, fn) {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('first argument must be an iterable');
    }

    if (typeof fn !== 'function') {
        throw new TypeError('second argument must be a function');
    }

    const outerIterator = iterable[Symbol.iterator]();
    let innerIterator = null;

    return {
        next() {
            while (true) {
                if (innerIterator) {
                    const { value, done } = innerIterator.next();
                    if (!done) return { value, done: false };
                    innerIterator = null;
                }

                const { value, done } = outerIterator.next();
                if (done) return { done: true, value: undefined };
                innerIterator = fn(value)[Symbol.iterator]();
            }
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}
