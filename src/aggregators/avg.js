export default function avg (iterable, fn = x => x) {
    let total = 0;
    let count = 0;

    for (const item of iterable) {
        total += fn(item);
        count++;
    }

    return count === 0 ? count : total / count;
}
