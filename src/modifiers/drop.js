export default function createDropIterator(iterable, n) {
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
