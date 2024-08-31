function reduceSync(iterable, reducer, initialValue) {
  if (!reducer) {
    throw new TypeError('The reducer argument must be provided');
  }

  if (typeof reducer !== 'function') {
    throw new TypeError('The reducer argument must be a function');
  }

  let accumulator = initialValue;

  for (const item of iterable) {
    accumulator = reducer(accumulator, item);
  }

  return accumulator;
}

async function reduceAsync(iterable, reducer, initialValue) {
  let accumulator = initialValue;

  for await (const item of iterable) {
    accumulator = await reducer(accumulator, item);
  }

  return accumulator;
}

export default function reduce(iterable, reducer, initialValue = 0) {
  if (!reducer) {
    throw new TypeError('The reducer argument must be provided');
  }

  if (typeof reducer !== 'function') {
    throw new TypeError('The reducer argument must be a function');
  }

  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('Provided object is not iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? reduceAsync(iterable, reducer, initialValue)
    : reduceSync(iterable, reducer, initialValue);
}
