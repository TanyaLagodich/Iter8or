export class ObjectIterable {
    constructor(object) {
        this.object = object;
    }

    [Symbol.iterator]() {
        const object = this.object;
        const keys = Object.keys(this.object);
        let i = 0;

        return {
            next() {
                if (i < keys.length) {
                    return {
                        done: false,
                        value: [keys[i], object[keys[i++]]],
                    }
                }
                return {
                    done: true,
                    value: undefined,
                }
            }
        }
    }
}
