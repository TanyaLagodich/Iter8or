export default function reduce(iterable, reducer, initialValue = 0) {
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
