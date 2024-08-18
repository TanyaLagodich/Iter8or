export default function sum(iterable, fn = x => x) {
    let total = 0;

    for (const item of iterable) {
        total += fn(item);
    }

    return total;
}
