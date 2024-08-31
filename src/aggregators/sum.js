function sumSync(iterable, fn = (x) => x) {
  let total = 0;

  for (const item of iterable) {
    total += fn(item);
  }

  return total;
}

async function sumAsync(iterable, fn = (x) => x) {
  let total = 0;

  for await (const item of iterable) {
    total += await fn(item);
  }

  return total;
}

export default function sum(iterable, fn = (x) => x) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('Provided object is not iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? sumAsync(iterable, fn)
    : sumSync(iterable, fn);
}
