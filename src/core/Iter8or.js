import {
  createMapIterator,
  createFilterIterator,
  createDropIterator,
  createConcatIterator,
  createFlatMapIterator,
  createReverseIterator,
  createTakeIterator,
  createFlatIterator,
} from '../modifiers/index.js';
import { avg, max, min, reduce, sum } from '../aggregators/index.js';
import { DigitsIterable } from './DigitsIterable.js';
import { RangeIterable } from './RangeIterable.js';
import { ObjectIterable } from './ObjectIterable.js';
import { convertToAsyncIterator } from '../utils/convertToAsyncIterator.js';
import {
  groupBy,
  partition,
  toArray,
  toMap,
  toObject,
  toSet,
  toString,
} from '../collectors/index.js'

/**
 * @class Iter8or
 * @classdesc Iter8or — это универсальный класс, который предоставляет различные методы для работы с итераторами, как синхронными, так и асинхронными.
 * Этот класс позволяет выполнять такие операции, как фильтрация, маппинг, объединение, сворачивание и другие, используя различные итераторы.
 */

export default class Iter8or {
  constructor(iterable, options = {}) {
    /**
     * Создает экземпляр Iter8or.
     * @param {Iterable|AsyncIterable|number|Object} iterable - Итерабельный объект, который будет использоваться в качестве исходного набора данных.
     * @param {Object} [options={}] - Объект с дополнительными опциями.
     * @param {boolean} [options.digits=false] - Если true, создается итератор по цифрам числа.
     * @param {boolean} [options.async=false] - Если true, создается асинхронный итератор.
     * @throws {TypeError} Если `iterable` — это null, undefined, boolean или function.
     */
    if (iterable === null || iterable === undefined) {
      throw new TypeError('Cannot create an iterable from null or undefined.');
    }

    if (typeof iterable === 'boolean') {
      throw new TypeError('Cannot create an iterable from a boolean.');
    }

    if (typeof iterable === 'function') {
      throw new TypeError('Cannot create an iterable from a function.');
    }

    this.options = options;

    if (!iterable[Symbol.iterator] && !iterable[Symbol.asyncIterator]) {
      this.createIterable(iterable, options);
    } else {
      if (this.options.async && !iterable[Symbol.asyncIterator]) {
        this.iterable = convertToAsyncIterator(iterable);
      } else {
        this.iterable = iterable;
      }
    }
  }

  /**
   * Synchronous iterator method.
   * @method
   * @memberof Iter8or
   * @instance
   * @returns {Iterator} The default iterator for the iterable.
   * @throws {TypeError} Throws if the iterable is asynchronous.
   */
  [Symbol.iterator]() {
    if (this.options.async) {
      throw new TypeError(
        'This is a async iterable. Use Symbol.asyncIterator instead.'
      );
    } else {
      return this.iterable[Symbol.iterator]();
    }
  }

  /**
   * Asynchronous iterator method.
   * @returns {AsyncIterator} The default async iterator for the iterable.
   * @throws {TypeError} Throws if the iterable is synchronous.
   */
  [Symbol.asyncIterator]() {
    if (!this.options.async) {
      throw new TypeError(
        'This is a sync iterable. Use Symbol.iterator instead.'
      );
    }

    return this.iterable[Symbol.asyncIterator]();
  }

  /**
   * Создает итератор на основе предоставленного типа данных.
   * Если передан `number`, создается итератор, который проходит от 0 до указанного числа включительно.
   * Если опция `digits` установлена в `true`, создается итератор, который разбивает число на отдельные разряды.
   * Если передан объект, создается итератор, который проходит по ключам и значениям объекта.
   *
   * @private
   * @memberof Iter8or
   * @param {number|Object} iterable - Данные для преобразования в итератор.
   * @throws {TypeError} Выбрасывает исключение, если тип данных не поддерживается.
   */
  createIterable(iterable) {
    if (typeof iterable === 'number') {
      if (this.options.digits) {
        this.iterable = new DigitsIterable(iterable);
      } else {
        this.iterable = new RangeIterable(iterable);
      }
    } else if (typeof iterable === 'object' && iterable !== null) {
      this.iterable = new ObjectIterable(iterable);
    } else {
      throw new TypeError('Unsupported iterable type.');
    }
  }

  /**
   * Применяет функцию ко всем элементам итератора и возвращает новый Iter8or.
   * @method map
   * @memberof Iter8or
   * @instance
   * @param {Function} fn - Функция, применяемая к каждому элементу итератора.
   * @returns {Iter8or} Новый экземпляр Iter8or с мапированными значениями.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const mapped = iter.map(x => x * 2);
   * console.log([...mapped]); // [2, 4, 6]
   */
  map(fn) {
    return new Iter8or(createMapIterator(this.iterable, fn), this.options);
  }

  /**
   * Filters the iterable using the provided predicate function.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} predicate - The filtering function.
   * @returns {Iter8or} A new instance with the filtered iterable.
   * @example
   * const iter = new Iter8or([1, 2, 3, 4]);
   * const filtered = iter.filter(x => x % 2 === 0);
   * console.log([...filtered]); // [2, 4]
   */
  filter(predicate) {
    return new Iter8or(
      createFilterIterator(this.iterable, predicate),
      this.options
    );
  }

  /**
   * Drops the first `n` elements from the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {number} n - The number of elements to drop.
   * @returns {Iter8or} A new instance with the dropped iterable.
   * @example
   * const iter = new Iter8or([1, 2, 3, 4]);
   * const dropped = iter.drop(2);
   * console.log([...dropped]); // [3, 4]
   */
  drop(n) {
    return new Iter8or(createDropIterator(this.iterable, n), this.options);
  }

  /**
   * Maps and flattens the iterable using the provided function.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} fn - The function to map and flatten the iterable.
   * @returns {Iter8or} A new instance with the flattened iterable.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const flatMapped = iter.flatMap(x => [x, x * 2]);
   * console.log([...flatMapped]); // [1, 2, 2, 4, 3, 6]
   */
  flatMap(fn) {
    return new Iter8or(createFlatMapIterator(this.iterable, fn), this.options);
  }

  /**
   * Flattens the iterable up to the specified depth.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {number} depth - The depth to flatten the iterable.
   * @returns {Iter8or} A new instance with the flattened iterable.
   * @example
   * const iter = new Iter8or([1, [2, [3, 4]]]);
   * const flattened = iter.flat(2);
   * console.log([...flattened]); // [1, 2, 3, 4]
   */
  flat(depth) {
    return new Iter8or(createFlatIterator(this.iterable, depth), this.options);
  }

  /**
   * Reverses the order of the elements in the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @returns {Iter8or} A new instance with the reversed iterable.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const reversed = iter.reverse();
   * console.log([...reversed]); // [3, 2, 1]
   */
  reverse() {
    return new Iter8or(createReverseIterator(this.iterable), this.options);
  }

  /**
   * Takes the first `n` elements from the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {number} n - The number of elements to take.
   * @returns {Iter8or} A new instance with the taken iterable.
   * @example
   * const iter = new Iter8or([1, 2, 3, 4]);
   * const taken = iter.take(2);
   * console.log([...taken]); // [1, 2]
   */
  take(n) {
    return new Iter8or(createTakeIterator(this.iterable, n), this.options);
  }

  /**
   * Concatenates the current iterable with other Iter8or instances.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {...Iter8or} iterators - The iterators to concatenate.
   * @returns {Iter8or} A new instance with the concatenated iterable.
   * @throws {Error} Throws if any of the provided iterators are not instances of Iter8or.
   * @example
   * const iter1 = new Iter8or([1, 2]);
   * const iter2 = new Iter8or([3, 4]);
   * const concatenated = iter1.concat(iter2);
   * console.log([...concatenated]); // [1, 2, 3, 4]
   */
  concat(...iterators) {
    if (!iterators.some((iterator) => iterator instanceof Iter8or)) {
      throw new Error('All concatted iterators must be an Iter8or.');
    }
    return new Iter8or(
      createConcatIterator(this.iterable, iterators),
      this.options
    );
  }

  /**
   * Calculates the average of the elements in the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} [fn] - Optional mapping function to apply before averaging.
   * @returns {number} The average value.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const average = iter.avg();
   * console.log(average); // 2
   */
  avg(fn) {
    return avg(this.iterable, fn);
  }

  /**
   * Finds the maximum value in the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} [fn] - Optional mapping function to apply before finding the maximum.
   * @returns {number} The maximum value.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const maximum = iter.max();
   * console.log(maximum); // 3
   */
  max(fn) {
    return max(this.iterable, fn);
  }

  /**
   * Finds the minimum value in the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} [fn] - Optional mapping function to apply before finding the minimum.
   * @returns {number} The minimum value.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const minimum = iter.min();
   * console.log(minimum); // 1
   */
  min(fn) {
    return min(this.iterable, fn);
  }

  /**
   * Reduces the iterable using the provided reducer function.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} reducer - The reducer function.
   * @param {*} [initialValue] - The initial value for the reduction.
   * @returns {*} The reduced value.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const sum = iter.reduce((acc, x) => acc + x, 0);
   * console.log(sum); // 6
   */
  reduce(reducer, initialValue) {
    return reduce(this.iterable, reducer, initialValue);
  }

  /**
   * Sums the elements in the iterable.
   * @method
   * @memberof Iter8or
   * @instance
   * @param {Function} [fn] - Optional mapping function to apply before summing.
   * @returns {number} The sum of the elements.
   * @example
   * const iter = new Iter8or([1, 2, 3]);
   * const totalSum = iter.sum();
   * console.log(totalSum); // 6
   */
  sum(fn) {
    return sum(this.iterable, fn);
  }

  /**
   * Группирует элементы итератора по ключам, определенным функцией группировщиком.
   * @method groupBy
   * @memberof Iter8or
   * @instance
   * @param {Function} grouper - Функция, которая принимает элемент и возвращает ключ группы.
   * @returns {Object} Объект, где ключи — это значения, возвращенные функцией группировщиком, а значения — массивы элементов, соответствующие этим ключам.
   * @example
   * const iter = new Iter8or(['apple', 'banana', 'cherry']);
   * const grouped = iter.groupBy(word => word.length);
   * console.log(grouped); // { 5: ['apple'], 6: ['banana', 'cherry'] }
   */
  groupBy(grouper) {
    return groupBy(this.iterable, grouper);
  }

  /**
   * Разделяет элементы итератора на две группы на основе предикатной функции.
   * @method partition
   * @memberof Iter8or
   * @instance
   * @param {Function} predicate - Функция, которая возвращает true или false для каждого элемента.
   * @returns {Array} Массив из двух массивов: [массив элементов, для которых предикат вернул true, массив элементов, для которых предикат вернул false].
   * @example
   * const iter = new Iter8or([1, 2, 3, 4, 5]);
   * const [evens, odds] = iter.partition(x => x % 2 === 0);
   * console.log(evens); // [2, 4]
   * console.log(odds);  // [1, 3, 5]
   */
  partition(predicate) {
    return partition(this.iterable, predicate);
  }
  /**
   * Собирает элементы итератора в массив.
   * @method toArray
   * @memberof Iter8or
   * @instance
   * @returns {Array} Массив, содержащий все элементы итератора.
   * @example
   * const iter = new Iter8or(new Set([1, 2, 3]));
   * const array = iter.toArray();
   * console.log(array); // [1, 2, 3]
   */
  toArray() {
    return toArray(this.iterable);
  }

  /**
   * Собирает элементы итератора в Map.
   * Элементы должны быть парами [ключ, значение].
   * @method toMap
   * @memberof Iter8or
   * @instance
   * @returns {Map} Map, содержащий все пары [ключ, значение] из итератора.
   * @example
   * const iter = new Iter8or([['a', 1], ['b', 2], ['c', 3]]);
   * const map = iter.toMap();
   * console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
   */
  toMap() {
    return toMap(this.iterable);
  }

  /**
   * Собирает элементы итератора в объект.
   * Элементы должны быть парами [ключ, значение].
   * @method toObject
   * @memberof Iter8or
   * @instance
   * @returns {Object} Объект, содержащий все пары [ключ, значение] из итератора.
   * @example
   * const iter = new Iter8or([['a', 1], ['b', 2], ['c', 3]]);
   * const obj = iter.toObject();
   * console.log(obj); // { a: 1, b: 2, c: 3 }
   */
  toObject() {
    return toObject(this.iterable);
  }

  /**
   * Собирает элементы итератора в Set.
   * @method toSet
   * @memberof Iter8or
   * @instance
   * @returns {Set} Set, содержащий все уникальные элементы итератора.
   * @example
   * const iter = new Iter8or([1, 2, 2, 3, 4]);
   * const set = iter.toSet();
   * console.log(set); // Set { 1, 2, 3, 4 }
   */
  toSet() {
    return toSet(this.iterable)
  }

  /**
   * Конкатенирует элементы итератора в строку.
   * @method toString
   * @memberof Iter8or
   * @instance
   * @returns {string} Строка, содержащая все элементы итератора, конкатенированные вместе.
   * @example
   * const iter = new Iter8or(['H', 'e', 'l', 'l', 'o']);
   * const str = iter.toString();
   * console.log(str); // 'Hello'
   */
  toString() {
    return toString(this.iterable);
  }
}

const groupByLength = (word) => word.length;
const syncIter = new Iter8or('big string');
console.log(syncIter.groupBy(groupByLength));

const asyncIter = new Iter8or([
    async () => 'apple',
    async () => 'banana',
    async () => 'cherry',
    async () => 'date',
    async () => 'fig',
], { async: true });

console.log(await asyncIter.groupBy(groupByLength));
