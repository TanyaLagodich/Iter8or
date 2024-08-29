export default function toMap(iterable) {
  const map = new Map();

  if (Array.isArray(iterable) || typeof iterable === 'string') {
    for (let i = 0; i < iterable.length; i++) {
      map.set(i, iterable[i]);
    }
  } else {
    for (const [key, value] of iterable) {
      map.set(key, value);
    }
  }
  return map;
}
