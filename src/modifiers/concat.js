const createSyncConcatIterator = (iterables) => {
  const iterators = iterables.map((iterable) => {
    if (!iterable[Symbol.iterator]) {
      throw new TypeError('All arguments must be iterable');
    }
    return iterable[Symbol.iterator]();
  });

  let currentIteratorIndex = 0;

  return {
    next() {
      while (currentIteratorIndex < iterators.length) {
        const result = iterators[currentIteratorIndex].next();
        if (!result.done) {
          return result;
        }
        currentIteratorIndex++;
      }
      return { done: true, value: undefined };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncConcatIterator = (iterables) => {
  const iterators = iterables.map((iterable) => {
    if (!iterable[Symbol.asyncIterator]) {
      throw new TypeError('All arguments must be iterable');
    }
    return iterable[Symbol.asyncIterator]();
  });

  let currentIteratorIndex = 0;

  return {
    async next() {
      while (currentIteratorIndex < iterators.length) {
        const result = await iterators[currentIteratorIndex].next();
        if (!result.done) {
          return result;
        }
        currentIteratorIndex++;
      }
      return { done: true, value: undefined };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createConcatIterator(...iterables) {
  return typeof iterables[0][Symbol.asyncIterator] === 'function'
    ? createAsyncConcatIterator(iterables)
    : createSyncConcatIterator(iterables);
}
