# Iter8or
[![npm version](https://badge.fury.io/js/iter8or.svg)](https://www.npmjs.com/package/iter8or)

[Documentation](https://tanyalagodich.github.io/Iter8or/)

Iter8or is a versatile library for working with iterators and asynchronous iterators in JavaScript. It provides powerful methods for processing, filtering, combining, and transforming data, and even allows the creation of iterators from non-iterable objects.

## Features

- **Support for both synchronous and asynchronous iterators**: Process both synchronous and asynchronous data using a single API.
- **Support for generator functions**: You can pass generator functions or async generator functions to the `Iter8or` constructor. The function will be invoked automatically, and the returned iterator will be used.
- **Creation of iterators from non-iterable objects:**:
  - For numbers (`number`):
    - **By default**, an iterator is created that iterates from _1_ (or _-1_ if the number is negative) to the specified number inclusively (range).
    - **The digits option**: If the `{ digits: true }` option is provided, the number is split into individual digits, creating an iterator over the digits of the number. This supports both regular numbers and `BigInt`.
    - If a range iterator is used, the allowed range is _from -(2 ** 32 - 1) to 2 ** 32 - 1_. This limitation is in place to prevent excessive memory and resource usage.
  - **For objects (`object`)**: An iterator is created that iterates over the keys and values of the object.
- **Powerful data processing methods**: Built-in methods for filtering, mapping, grouping, splitting, combining, and other data operations.
- **Support for ES Modules and CommonJS**: The library can be used with both modern ES modules and traditional CommonJS modules.

## Installation

Install the library using npm:

```bash
npm install iter8or
```

## Example Usage

- ### With an array
```javascript
import Iter8or from 'iter8or';

const iter = new Iter8or([1, 2, 3]);
const mapped = iter.map(x => x * 2);
console.log([...mapped]); // [2, 4, 6]
```
- ### With a number
```javascript
const rangeIter = new Iter8or(3);
console.log([...rangeIter]); // [1, 2, 3]
```
- ### With a number and the digits option
```javascript
const digitsIter = new Iter8or(12345, { digits: true });
console.log([...digitsIter]); // [1, 2, 3, 4, 5]
```

- ### With an object
```javascript
const objIter = new Iter8or({ a: 1, b: 2 });
for (const [key, value] of objIter) {
    console.log(key, value);
}
// a 1
// b 2
```

- ### With a generator function
```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const iter = new Iter8or(generatorFunction);
console.log([...iter]); // [1, 2, 3]
```

- ### With an async generator function
```javascript
async function* asyncGeneratorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const iter = new Iter8or(asyncGeneratorFunction, { async: true });
(async () => {
  for await (const value of iter) {
    console.log(value); // 1, 2, 3
  }
})();
```

## Working with Asynchronous Iterators
To use asynchronous iterators, you need to pass the `{ async: true }` option to the constructor.
This allows you to correctly process asynchronous data using `await`. **Otherwise, the iterator will be processed as a synchronous iterator.**
For example:
```javascript
const asyncIter = new Iter8or([
  async () => 'apple',
  async () => 'banana',
  async () => 'cherry'
], { async: true });

for await (const value of asyncIter) {
  console.log(value);
}
// 'apple'
// 'banana'
// 'cherry'
```

## Important Notes on Numbers
- **The `digits: true` option**: Allows iterating over individual digits of a number, supporting both regular numbers and `BigInt`.
- Numbers (`number`) are always processed as **_synchronous_** iterators, regardless of whether the `{ async: true }` option is passed.

### Iteration Over Ranges (RangeIterable):
Range iterators (`range`) are limited to numbers **_from -(2 ** 32 - 1) to 2 ** 32 - 1_**. This limitation is in place to prevent excessive memory and resource usage. If you try to create a range beyond these values, the library will throw a _RangeError_.

### Example with RangeIterable:
```javascript
const rangeIter = new Iter8or(5);
console.log([...rangeIter]); // [1, 2, 3, 4, 5]
```

### Example with BigInt and the digits: true Option:
```javascript
const bigIntIter = new Iter8or(12345678901234567890n, { digits: true });
console.log([...bigIntIter]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
```

[🔍 Learn more about each method of the Iter8or class](https://tanyalagodich.github.io/Iter8or/Iter8or.html)

[🇷🇺 Перейти на русский](https://tanyalagodich.github.io/Iter8or/ru/)
