const partitionSync = (iterable, predicate) => {
    const truthy = [];
    const falsy = [];

    for (const item of iterable) {
        if (predicate(item)) {
            truthy.push(item);
        } else {
            falsy.push(item);
        }
    }

    return [truthy, falsy];
};

const partitionAsync = async (iterable, predicate) => {
    const truthy = [];
    const falsy = [];

    for await (const item of iterable) {
        const result = typeof item === 'function' ? await item() : item;
        if (predicate(result)) {
            truthy.push(result);
        } else {
            falsy.push(result);
        }
    }

    return [truthy, falsy];
};

export default function partition(iterable, predicate) {
    if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
        throw new TypeError('The argument must be iterable');
    }

    return typeof iterable[Symbol.asyncIterator] === 'function'
        ? partitionAsync(iterable, predicate)
        : partitionSync(iterable, predicate);
}
