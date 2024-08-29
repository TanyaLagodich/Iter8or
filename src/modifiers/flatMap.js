const createSyncFlatMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.iterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('second argument must be a function');
  }

  const outerIterator = iterable[Symbol.iterator]();
  let innerIterator = null;

  return {
    next() {
      while (true) {
        if (innerIterator) {
          const { value, done } = innerIterator.next();
          if (!done) return { value, done: false };
          innerIterator = null;
        }

        const { value, done } = outerIterator.next();
        if (done) return { done: true, value: undefined };
        innerIterator = fn(value)[Symbol.iterator]();
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncFlatMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.asyncIterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('second argument must be a function');
  }

  const outerIterator = iterable[Symbol.asyncIterator]();
  let innerIterator = null;

  return {
    async next() {
      while (true) {
        if (innerIterator) {
          const { value, done } = await innerIterator.next();
          if (!done) return { value, done: false };
          innerIterator = null;
        }

        const { value, done } = await outerIterator.next();
        if (done) return { done: true, value: undefined };

        // console.log({ value })
        const innerIterable = await fn(value);
        // console.log({ innerIterable })
        if (innerIterable[Symbol.asyncIterator]) {
          innerIterator = innerIterable[Symbol.asyncIterator]();
        } else if (innerIterable[Symbol.iterator]) {
          innerIterator = innerIterable[Symbol.iterator]();
        } else {
          throw new TypeError(
            'Function must return an iterable or async iterable'
          );
        }
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createFlatMapIterator(iterable, fn) {
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncFlatMapIterator(iterable, fn)
    : createSyncFlatMapIterator(iterable, fn);
}
