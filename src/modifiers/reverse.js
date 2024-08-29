const createSyncReverseIterator = (iterable) => {
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
        };
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

const createAsyncReverseIterator = (iterable) => {
  let items = [];
  let index = 0;

  return {
    async next() {
      if (items.length === 0) {
        for await (const item of iterable) {
          items.push(item);
        }
        index = items.length - 1;
      }
      if (index >= 0) {
        return {
          value: items[index--],
          done: false,
        };
      } else {
        return {
          done: true,
          value: undefined,
        };
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createReverseIterator(iterable) {
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncReverseIterator(iterable)
    : createSyncReverseIterator(iterable);
}
