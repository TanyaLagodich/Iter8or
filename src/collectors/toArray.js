const toArraySync = (iterable) => {
  return Array.from(iterable);
};

const toArrayAsync = async (iterable) => {
  const result = [];
  for await (const item of iterable) {
    if (typeof item === 'function') {
      result.push(await item());
    } else {
      result.push(item);
    }
  }
  return result;
};

export default function toArray(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? toArrayAsync(iterable)
    : toArraySync(iterable);
}
