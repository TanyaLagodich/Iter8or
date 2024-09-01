# Iter8or
[![npm version](https://badge.fury.io/js/iter8or.svg)](https://www.npmjs.com/package/iter8or)

[Documentation](https://tanyalagodich.github.io/Iter8or/)

Iter8or is a versatile library for working with iterators and asynchronous iterators in JavaScript. It provides powerful methods for processing, filtering, combining, and transforming data, and even allows the creation of iterators from non-iterable objects.

## Features

- **Support for both synchronous and asynchronous iterators**: Process both synchronous and asynchronous data using a single API.
- **Creation of iterators from non-iterable objects:**:
  - For numbers (`number`): By default, it creates an iterator that iterates from 1 to the specified number (range).
  - `digits` option: If the `{ digits: true }` option is passed, the number is split into individual digits, creating an iterator over the digits of the number.
  - For objects (`object`): An iterator is created that iterates over the keys and values of the object.
- **Powerful data processing methods**: Built-in methods for filtering, mapping, grouping, splitting, combining, and other data operations.

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

Numbers (`number`) are always processed as **_synchronous_** iterators, regardless of whether the `{ async: true }` option is passed or not.

[🔍 Learn more about each method of the Iter8or class](https://tanyalagodich.github.io/Iter8or/Iter8or.html)

[🇷🇺 Перейти на русский](https://tanyalagodich.github.io/Iter8or/ru/)
