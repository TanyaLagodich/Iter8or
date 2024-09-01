const toMapSync = (iterable) => {
  const map = new Map();
  let index = 0;

  for (const item of iterable) {
    // for [key,value] syntax
    if (Array.isArray(item) && item.length === 2) {
      const [key, value] = item;
      map.set(key, value);
    } else {
      map.set(index, item);
      index++;
    }
  }
  return map;
};

const toMapAsync = async (iterable) => {
  const map = new Map();
  let index = 0;

  for await (const item of iterable) {
    // for [key,value] syntax
    if (Array.isArray(item) && item.length === 2) {
      const [key, value] = item;
      map.set(key, value);
    } else {
      map.set(index, item);
      index++;
    }
  }

  return map;
};

export default function toMap(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }
  return typeof iterable[Symbol.asyncIterator] === 'function'
      ? toMapAsync(iterable)
      : toMapSync(iterable);
}
