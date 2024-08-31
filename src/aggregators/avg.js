function avgSync(iterable, fn = (x) => x) {
  let total = 0;
  let count = 0;

  for (const item of iterable) {
    total += fn(item);
    count++;
  }

  return count === 0 ? 0 : total / count;
}

async function avgAsync(iterable, fn = (x) => x) {
  let total = 0;
  let count = 0;

  for await (const item of iterable) {
    total += fn(item);
    count++;
  }

  return count === 0 ? 0 : total / count;
}

export default function avg(iterable, fn = (x) => x) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('Provided object is not iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? avgAsync(iterable, fn)
    : avgSync(iterable, fn);
}
