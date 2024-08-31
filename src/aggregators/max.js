function maxSync(iterable, fn = (x) => x) {
  let max = -Infinity;

  for (const item of iterable) {
    const value = fn(item);
    max = Math.max(max, value);
  }

  return max;
}

async function maxAsync(iterable, fn = (x) => x) {
  let max = -Infinity;

  for await (const item of iterable) {
    const value = await fn(item);
    max = Math.max(max, value);
  }

  return max;
}

export default function max(iterable, fn = (x) => x) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('Provided object is not iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? maxAsync(iterable, fn)
    : maxSync(iterable, fn);
}
