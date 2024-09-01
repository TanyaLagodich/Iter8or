const toStringSync = (iterable) => {
  return Array.from(iterable).join('');
};

const toStringAsync = async (iterable) => {
  let array = [];
  for await (const value of iterable) {
    if (typeof value === 'function') {
      array.push(await value());
    } else {
      array.push(value);
    }
  }

  return array.join('');
};

export default function toString(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? toStringAsync(iterable)
    : toStringSync(iterable);
}
