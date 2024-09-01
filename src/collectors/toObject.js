const toMapSync = (iterable) => {
  const obj = {};
  let index = 0;

  for (const item of iterable) {
    // for [key,value] syntax
    if (Array.isArray(item) && item.length === 2) {
      const [key, value] = item;
      obj[key] = value;
    } else {
      obj[index] = item;
      index++;
    }
  }
  return obj;
};

const toMapAsync = async (iterable) => {
  const obj = {};
  let index = 0;

  for await (const item of iterable) {
    // for [key,value] syntax
    if (Array.isArray(item) && item.length === 2) {
      const [key, value] = item;
      obj[key] = value;
    } else {
      obj[index] = item;
      index++;
    }
  }

  return obj;
};

export default function toMap(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? toMapAsync(iterable)
    : toMapSync(iterable);
}
