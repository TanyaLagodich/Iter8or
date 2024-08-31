function minSync(iterable, fn = (x) => x) {
  let min = Infinity;

  for (const item of iterable) {
    const value = fn(item);
    min = Math.min(min, value);
  }

  return min;
}

async function minAsync(iterable, fn = (x) => x) {
  let min = Infinity;

  for await (const item of iterable) {
    const value = await fn(item);
    min = Math.min(min, value);
  }

  return min;
}

export default function min(iterable, fn = (x) => x) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('Provided object is not iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? minAsync(iterable, fn)
    : minSync(iterable, fn);
}
