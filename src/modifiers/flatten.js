const createSyncFlattenIterator = (iterable) => {
    const stack = [iterable[Symbol.iterator]()];

    return {
        next() {
            while (stack.length > 0) {
                const currentIterator = stack[stack.length - 1];
                const result = currentIterator.next();

                if (result.done) {
                    stack.pop();
                    continue;
                }

                if (result.value && typeof result.value[Symbol.iterator] === 'function') {
                    stack.push(result.value[Symbol.iterator]());
                } else {
                    return { done: false, value: result.value };
                }
            }

            return { done: true, value: undefined };
        },
        [Symbol.iterator]() {
            return this;
        },
    };
};

const createAsyncFlattenIterator = (iterable) => {
    const stack = [iterable[Symbol.asyncIterator]()];

    return {
        async next() {
            while (stack.length > 0) {
                const currentIterator = stack[stack.length - 1];
                const result = await currentIterator.next();

                if (result.done) {
                    stack.pop();
                    continue;
                }

                if (result.value && typeof result.value[Symbol.asyncIterator] === 'function') {
                    stack.push(result.value[Symbol.asyncIterator]());
                } else if (result.value && typeof result.value[Symbol.iterator] === 'function') {
                    stack.push(result.value[Symbol.iterator]());
                } else {
                    return { done: false, value: result.value };
                }
            }

            return { done: true, value: undefined };
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
};

export default function createFlattenIterator(iterable) {
    return typeof iterable[Symbol.asyncIterator] === 'function'
        ? createAsyncFlattenIterator(iterable)
        : createSyncFlattenIterator(iterable);
}
