const toObjectSync = (iterable) => {
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

const toObjectAsync = async (iterable) => {
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

export default function toObject(iterable) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }
  return typeof iterable[Symbol.asyncIterator] === 'function'
      ? toObjectAsync(iterable)
      : toObjectSync(iterable);
}
