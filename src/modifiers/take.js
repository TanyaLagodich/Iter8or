export default function createTakeIterator(iterable, n) {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('first argument must be an iterable');
    }

    const iterator = iterable[Symbol.iterator]();
    let count = 0;

    return {
        next() {
            if (count < n) {
                count++;

                const { done, value } = iterator.next();
                return { done, value };
            }
            return {
                done: true,
                value: undefined,
            }
        },
        [Symbol.iterator]() {
            return this;
        }
    }
}
