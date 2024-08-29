const createSyncTakeIterator = (iterable, n) => {
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
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncTakeIterator = (iterable, n) => {
  if (!iterable[Symbol.asyncIterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  const iterator = iterable[Symbol.asyncIterator]();
  let count = 0;

  return {
    async next() {
      if (count < n) {
        count++;

        const { done, value } = await iterator.next();
        return { done, value };
      }
      return {
        done: true,
        value: undefined,
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createTakeIterator(iterable, predicate) {
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncTakeIterator(iterable, predicate)
    : createSyncTakeIterator(iterable, predicate);
}
