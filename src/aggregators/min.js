export default function min(iterable, fn = (x) => x) {
  let min = Infinity;

  for (const item of iterable) {
    const value = fn(item);
    min = Math.min(min, value);
  }

  return min;
}
