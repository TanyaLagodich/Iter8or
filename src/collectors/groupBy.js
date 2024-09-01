const groupBySync = (iterable, grouper) => {
  const groups = {};

  for (const item of iterable) {
    const key = grouper(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }

  return groups;
};

const groupByAsync = async (iterable, grouper) => {
  const groups = {};

  for await (const item of iterable) {
    const key = grouper(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }

  return groups;
};

export default function groupBy(iterable, grouper) {
  if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
    throw new TypeError('The argument must be iterable');
  }

  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? groupByAsync(iterable, grouper)
    : groupBySync(iterable, grouper);
}
