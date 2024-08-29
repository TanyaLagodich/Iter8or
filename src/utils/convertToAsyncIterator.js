export const convertToAsyncIterator = (iterator) => {
  if (iterator[Symbol.asyncIterator]) {
    return iterator;
  }

  const resolveItem = async (item) => {
    if (typeof item === 'function') {
      return await item();
    }
    return await item;
  };

  return {
    [Symbol.asyncIterator]() {
      const syncIterator = iterator[Symbol.iterator]
        ? iterator[Symbol.iterator]()
        : iterator;

      return {
        async next() {
          const { value, done } = syncIterator.next();
          if (done) {
            return { value: undefined, done: true };
          } else {
            const resolvedValue = await resolveItem(value);
            return { value: resolvedValue, done: false };
          }
        },
      };
    },
  };
};
