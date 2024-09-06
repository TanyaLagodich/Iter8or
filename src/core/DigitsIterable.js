export class DigitsIterable {
  constructor(number) {
    if (typeof number === 'bigint' || number > Number.MAX_SAFE_INTEGER) {
      this.number = number >= 0n ? BigInt(number) : BigInt(number) * -1n;
    } else {
      const integerPart = Math.trunc(number);
      const fractionalPart = number - integerPart;

      if (fractionalPart !== 0) {
        throw new RangeError(`The number ${number} cannot be converted to an Iterable because it is not an integer`);
      }
      this.number = Math.abs(number);
    }
  }

  [Symbol.iterator]() {
    let number = this.number;
    return {
      next() {
        if (typeof number === 'bigint') {
          if (number > 0n) {
            const digit = number % 10n;
            number = number / 10n;
            return { value: Number(digit), done: false };
          }
        } else {
          if (number > 0) {
            const digit = number % 10;
            number = Math.floor(number / 10);
            return { value: digit, done: false };
          }
        }

        return { done: true, value: undefined };
      },
    };
  }
}
