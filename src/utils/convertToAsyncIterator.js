export const convertToAsyncIterator = (iterator) => {
  const resolveItem = async (item) => {
    if (typeof item === 'function') {
      return await item();
    }
    return await item;
  };

  return {
    [Symbol.asyncIterator]() {
      let index = 0;

      return {
        async next() {
          if (index < iterator.length) {
            const value = await resolveItem(iterator[index]);
            index++;
            return { value, done: false };
          } else {
            return { value: undefined, done: true };
          }
        },
      };
    },
  };
};
