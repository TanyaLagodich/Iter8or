export default function max(iterable, fn = (x) => x) {
  let max = -Infinity;

  for (const item of iterable) {
    const value = fn(item);
    max = Math.max(max, value);
  }

  return max;
}
