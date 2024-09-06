export class RangeIterable {
  constructor(number) {
    const MAX_LIMIT = 2 ** 32 - 1;
    if (
      typeof number !== 'number' ||
      number > MAX_LIMIT ||
      number < -MAX_LIMIT
    ) {
      throw new RangeError(
        'Number exceeds MAX_LIMIT. You can create a range up to ±(2 ** 32 - 1).'
      );
    }
    this.number = number;
  }

  [Symbol.iterator]() {
    let i = this.number > 0 ? 1 : -1;
    const number = this.number;

    return {
      next() {
        if (number > 0 && i <= number) {
          return {
            done: false,
            value: i++,
          };
        }

        if (number < 0 && i >= number) {
          return {
            done: false,
            value: i--,
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
