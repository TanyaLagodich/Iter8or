export class RangeIterable {
  constructor(number) {
    this.number = number;
  }

  [Symbol.iterator]() {
    let i = 1;
    const number = this.number;

    return {
      next() {
        if (i <= number) {
          return {
            done: false,
            value: i++,
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
