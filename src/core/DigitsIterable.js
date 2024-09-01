export class DigitsIterable {
  constructor(number) {
    if (typeof number === 'bigint' || number > Number.MAX_SAFE_INTEGER) {
      this.number = BigInt(number);
    } else {
      this.number = number;
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
