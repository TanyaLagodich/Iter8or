export default function toObject(iterable) {
    const obj = {};
    for (const [key, value] of iterable) {
        obj[key] = value;
    }
    return obj;
}
