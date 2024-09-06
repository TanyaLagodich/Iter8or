export class RangeIterable {
  constructor(number) {
    const MAX_LIMIT = Number.MAX_SAFE_INTEGER;
    const MIN_LIMIT = Number.MIN_SAFE_INTEGER;

    if (
      typeof number !== 'number' ||
      number > MAX_LIMIT ||
      number < MIN_LIMIT
    ) {
      throw new RangeError(
        `Number exceeds MAX_LIMIT. You can create a range up to +${MAX_LIMIT} and down to ${MIN_LIMIT}.`
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
