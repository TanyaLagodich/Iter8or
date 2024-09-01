const createSyncMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.iterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('second argument must be a function');
  }

  const iterator = iterable[Symbol.iterator]();

  return {
    next() {
      const { value, done } = iterator.next();
      return done
        ? { value: undefined, done: true }
        : { value: fn(value), done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.asyncIterator]) {
    throw new TypeError('First argument must be an async iterable or iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const iterator = iterable[Symbol.asyncIterator]();

  return {
    async next() {
      const { value, done } = await iterator.next();
      return done
        ? { value: undefined, done: true }
        : { value: await fn(value), done: false };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createMapIterator(iterable, fn) {
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncMapIterator(iterable, fn)
    : createSyncMapIterator(iterable, fn);
}
