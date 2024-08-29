export class DigitsIterable {
  constructor(number) {
    this.number = number;
  }

  [Symbol.iterator]() {
    let number = this.number;
    return {
      next() {
        while (number > 0) {
          const digit = number % 10;
          number = Math.floor(number / 10);

          return {
            value: digit,
            done: false,
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
