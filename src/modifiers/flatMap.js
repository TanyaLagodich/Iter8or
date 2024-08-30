const createSyncFlatMapIterator = (iterable, fn) => {
  const iterator = iterable[Symbol.iterator]();
  let innerIterator = null;

  return {
    next() {
      while (true) {
        if (innerIterator) {
          const innerResult = innerIterator.next();
          if (!innerResult.done) {
            return { done: false, value: innerResult.value };
          }
          innerIterator = null;
        }

        const outerResult = iterator.next();
        if (outerResult.done) {
          return { done: true, value: undefined };
        }

        const mapped = fn(outerResult.value);
        if (mapped && typeof mapped[Symbol.iterator] === 'function') {
          innerIterator = mapped[Symbol.iterator]();
        } else {
          return { done: false, value: mapped };
        }
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncFlatMapIterator = (iterable, fn) => {
  const iterator = iterable[Symbol.asyncIterator]();
  let innerIterator = null;

  return {
    async next() {
      while (true) {
        if (innerIterator) {
          const innerResult = await innerIterator.next();
          if (!innerResult.done) {
            return { done: false, value: innerResult.value };
          }
          innerIterator = null;
        }

        const outerResult = await iterator.next();
        if (outerResult.done) {
          return { done: true, value: undefined };
        }

        const mapped = await fn(outerResult.value);
        if (mapped && typeof mapped[Symbol.asyncIterator] === 'function') {
          innerIterator = mapped[Symbol.asyncIterator]();
        } else if (mapped && typeof mapped[Symbol.iterator] === 'function') {
          innerIterator = mapped[Symbol.iterator]();
        } else {
          return { done: false, value: mapped };
        }
      }
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createFlatMapIterator(iterable, fn) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('second argument must be a function');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
      ? createAsyncFlatMapIterator(iterable, fn)
      : createSyncFlatMapIterator(iterable, fn);
}
