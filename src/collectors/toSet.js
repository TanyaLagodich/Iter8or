const toSetSync = (iterable) => {
  return new Set(iterable);
};

const toSetAsync = async (iterable) => {
  const resultSet = new Set();
  for await (const value of iterable) {
    if (typeof value === 'function') {
      resultSet.add(await value());
    } else {
      resultSet.add(value);
    }
  }
  return resultSet;
};

export default function toSet(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }
  return typeof iterable[Symbol.asyncIterator] === 'function'
      ? toSetAsync(iterable)
      : toSetSync(iterable);
}
