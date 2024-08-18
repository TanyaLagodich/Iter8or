export default function createMapIterator(iterable, fn) {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('first argument must be an iterable');
    }

    if (typeof fn !== 'function') {
        throw new TypeError('second argument must be a function');
    }

    const iterator = iterable[Symbol.iterator]();

    return {
        next() {
            const { value, done } = iterator.next();
            return done ? { value: undefined, done: true } : { value: fn(value), done: false };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}
