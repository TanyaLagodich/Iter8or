const createSyncConcatIterator = (iterators) => {
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

const createAsyncConcatIterator = (iterators) => {
  let currentIteratorIndex = 0;
  return {
    async next() {
      while (currentIteratorIndex < iterators.length) {
        const iterator = iterators[currentIteratorIndex];

        const result = await iterator.next();

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
  const iterators = iterables.map((iterable) => {
    if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
      throw new TypeError('All arguments must be iterable');
    }
    return iterable[Symbol.asyncIterator]
      ? iterable[Symbol.asyncIterator]()
      : iterable[Symbol.iterator]();
  });

  return iterators.some(
    (iterator) => typeof iterator[Symbol.asyncIterator] === 'function'
  )
    ? createAsyncConcatIterator(iterators)
    : createSyncConcatIterator(iterators);
}
