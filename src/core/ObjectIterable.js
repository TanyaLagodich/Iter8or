export class ObjectIterable {
  constructor(object) {
    this.object = object;
  }

  [Symbol.iterator]() {
    const object = this.object;
    const keys = Object.keys(object);
    let i = 0;

    return {
      next() {
        if (i < keys.length) {
          return {
            done: false,
            value: [keys[i], object[keys[i++]]],
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }

  [Symbol.asyncIterator]() {
    const object = this.object;
    const keys = Object.keys(object);
    let i = 0;

    return {
      async next() {
        if (i < keys.length) {
          const key = keys[i++];
          let value = object[key];

          if (typeof value === 'function') {
            value = await value();
          } else if (value instanceof Promise) {
            value = await value;
          }

          return {
            done: false,
            value: [key, value],
          };
        }
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }
}
