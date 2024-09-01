// English-specific documentation for Iter8or

/**
 * Creates an instance of Iter8or.
 * @class Iter8or
 * @param {Iterable|AsyncIterable|number|Object} iterable - The iterable object to use as the source data set.
 * @param {Object} [options={}] - An object with additional options.
 * @param {boolean} [options.digits=false] - If true, an iterator is created over the digits of a number.
 * @param {boolean} [options.async=false] - If true, an asynchronous iterator is created.
 * @throws {TypeError} If `iterable` is null, undefined, boolean, or function.
 */

/**
 * Synchronous iterator method.
 * @method
 * @memberof Iter8or
 * @instance
 * @returns {Iterator} The default iterator for the iterable.
 * @throws {TypeError} Throws if the iterable is asynchronous.
 */

/**
 * Asynchronous iterator method.
 * @returns {AsyncIterator} The default async iterator for the iterable.
 * @throws {TypeError} Throws if the iterable is synchronous.
 */

/**
 * Applies a function to all elements of the iterator and returns a new Iter8or instance.
 * @method map
 * @memberof Iter8or
 * @instance
 * @param {Function} fn - The function to apply to each element of the iterator.
 * @returns {Iter8or} A new Iter8or instance with the mapped values.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const mapped = iter.map(x => x * 2);
 * console.log([...mapped]); // [2, 4, 6]
 */

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

/**
 * Partitions the elements of the iterator into two groups based on the predicate function.
 * @method partition
 * @memberof Iter8or
 * @instance
 * @param {Function} predicate - The function that returns true or false for each element.
 * @returns {Array} An array of two arrays: [array of elements for which the predicate returned true, array of elements for which the predicate returned false].
 * @example
 * const iter = new Iter8or([1, 2, 3, 4, 5]);
 * const [evens, odds] = iter.partition(x => x % 2 === 0);
 * console.log(evens); // [2, 4]
 * console.log(odds);  // [1, 3, 5]
 */

/**
 * Collects the elements of the iterator into an array.
 * @method toArray
 * @memberof Iter8or
 * @instance
 * @returns {Array} An array containing all the elements of the iterator.
 * @example
 * const iter = new Iter8or(new Set([1, 2, 3]));
 * const array = iter.toArray();
 * console.log(array); // [1, 2, 3]
 */

/**
 * Collects the elements of the iterator into a Map.
 * The elements must be pairs [key, value].
 * @method toMap
 * @memberof Iter8or
 * @instance
 * @returns {Map} A Map containing all the key-value pairs from the iterator.
 * @example
 * const iter = new Iter8or([['a', 1], ['b', 2], ['c', 3]]);
 * const map = iter.toMap();
 * console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }
 */

/**
 * Collects the elements of the iterator into an object.
 * The elements must be pairs [key, value].
 * @method toObject
 * @memberof Iter8or
 * @instance
 * @returns {Object} An object containing all the key-value pairs from the iterator.
 * @example
 * const iter = new Iter8or([['a', 1], ['b', 2], ['c', 3]]);
 * const obj = iter.toObject();
 * console.log(obj); // { a: 1, b: 2, c: 3 }
 */

/**
 * Collects the elements of the iterator into a Set.
 * @method toSet
 * @memberof Iter8or
 * @instance
 * @returns {Set} A Set containing all unique elements of the iterator.
 * @example
 * const iter = new Iter8or([1, 2, 2, 3, 4]);
 * const set = iter.toSet();
 * console.log(set); // Set { 1, 2, 3, 4 }
 */

/**
 * Concatenates the elements of the iterator into a string.
 * @method toString
 * @memberof Iter8or
 * @instance
 * @returns {string} A string containing all the elements of the iterator concatenated together.
 * @example
 * const iter = new Iter8or(['H', 'e', 'l', 'l', 'o']);
 * const str = iter.toString();
 * console.log(str); // 'Hello'
 */
