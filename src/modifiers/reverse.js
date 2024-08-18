export default function createReverseIterator (iterable) {
    if (!iterable[Symbol.iterator]) {
        throw new TypeError('the argument must be an iterable');
    }

    const items = [...iterable];
    let index = items.length - 1;

    return {
        next() {
            if (index >= 0) {
                return {
                    value: items[index--],
                    done: false,
                }
            }
            return {
                done: true,
                value: undefined,
            }
        },
        [Symbol.iterator]() {
            return this;
        },
    }
}
