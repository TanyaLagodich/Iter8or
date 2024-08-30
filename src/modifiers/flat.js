const createSyncFlatIterator = (iterable, depth) => {
  const stack = [{ iterator: iterable[Symbol.iterator](), depth }];

  return {
    next() {
      while (stack.length > 0) {
        const { iterator, depth } = stack[stack.length - 1];
        const result = iterator.next();

        if (result.done) {
          stack.pop();
          continue;
        }

        if (
          depth > 0 &&
          result.value &&
          typeof result.value[Symbol.iterator] === 'function'
        ) {
          stack.push({
            iterator: result.value[Symbol.iterator](),
            depth: depth - 1,
          });
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

const createAsyncFlatIterator = (iterable, depth) => {
  const stack = [{ iterator: iterable[Symbol.asyncIterator](), depth }];

  return {
    async next() {
      while (stack.length > 0) {
        const { iterator, depth } = stack[stack.length - 1];
        const result = await iterator.next();

        if (result.done) {
          stack.pop();
          continue;
        }

        let value = result.value;

        if (typeof value === 'function') {
          value = await value();
        }

        if (
          depth > 0 &&
          result.value &&
          typeof result.value[Symbol.asyncIterator] === 'function'
        ) {
          stack.push({
            iterator: value[Symbol.asyncIterator](),
            depth: depth - 1,
          });
        } else if (
          depth > 0 &&
          result.value &&
          typeof result.value[Symbol.iterator] === 'function'
        ) {
          stack.push({ iterator: value[Symbol.iterator](), depth: depth - 1 });
        } else {
          return { done: false, value: value };
        }
      }

      return { done: true, value: undefined };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

export default function createFlatIterator(iterable, depth = 1) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncFlatIterator(iterable, depth)
    : createSyncFlatIterator(iterable, depth);
}
