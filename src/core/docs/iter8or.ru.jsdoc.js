// Русскоязычная документация для Iter8or

/**
 * Создает экземпляр Iter8or.
 * @class Iter8or
 * @param {Iterable|AsyncIterable|number|Object} iterable - Итерабельный объект, который будет использоваться в качестве исходного набора данных.
 * @param {Object} [options={}] - Объект с дополнительными опциями.
 * @param {boolean} [options.digits=false] - Если true, создается итератор по цифрам числа.
 * @param {boolean} [options.async=false] - Если true, создается асинхронный итератор.
 * @throws {TypeError} Если `iterable` — это null, undefined, boolean или function.
 */

/**
 * Возвращает следующее значение итератора
 * @method next
 * @memberof Iter8or
 * @returns {IteratorResult} Следующее значение итератора
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * console.log(iter.next().value); // Output: 1
 */

/**
 * Применяет функцию ко всем элементам итератора и возвращает новый экземпляр Iter8or.
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

/**
 * Фильтрует элементы итератора, используя предоставленную функцию предикат.
 * @method filter
 * @memberof Iter8or
 * @instance
 * @param {Function} predicate - Функция фильтрации.
 * @returns {Iter8or} Новый экземпляр с отфильтрованными элементами итератора.
 * @example
 * const iter = new Iter8or([1, 2, 3, 4]);
 * const filtered = iter.filter(x => x % 2 === 0);
 * console.log([...filtered]); // [2, 4]
 */

/**
 * Пропускает первые `n` элементов из итератора.
 * @method drop
 * @memberof Iter8or
 * @instance
 * @param {number} n - Количество элементов для пропуска.
 * @returns {Iter8or} Новый экземпляр с итератором, пропустившим `n` элементов.
 * @example
 * const iter = new Iter8or([1, 2, 3, 4]);
 * const dropped = iter.drop(2);
 * console.log([...dropped]); // [3, 4]
 */

/**
 * Применяет функцию ко всем элементам итератора и разворачивает результаты в один уровень.
 * @method flatMap
 * @memberof Iter8or
 * @instance
 * @param {Function} fn - Функция для применения и разворачивания итератора.
 * @returns {Iter8or} Новый экземпляр с развёрнутым итератором.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const flatMapped = iter.flatMap(x => [x, x * 2]);
 * console.log([...flatMapped]); // [1, 2, 2, 4, 3, 6]
 */

/**
 * Разворачивает элементы итератора до указанной глубины.
 * @method flat
 * @memberof Iter8or
 * @instance
 * @param {number} depth - Глубина развёртки итератора.
 * @returns {Iter8or} Новый экземпляр с развёрнутым итератором.
 * @example
 * const iter = new Iter8or([1, [2, [3, 4]]]);
 * const flattened = iter.flat(2);
 * console.log([...flattened]); // [1, 2, 3, 4]
 */

/**
 * Переворачивает порядок элементов в итераторе.
 * @method reverse
 * @memberof Iter8or
 * @instance
 * @returns {Iter8or} Новый экземпляр с перевёрнутым итератором.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const reversed = iter.reverse();
 * console.log([...reversed]); // [3, 2, 1]
 */

/**
 * Берёт первые `n` элементов из итератора.
 * @method take
 * @memberof Iter8or
 * @instance
 * @param {number} n - Количество элементов для взятия.
 * @returns {Iter8or} Новый экземпляр с итератором, взявшим `n` элементов.
 * @example
 * const iter = new Iter8or([1, 2, 3, 4]);
 * const taken = iter.take(2);
 * console.log([...taken]); // [1, 2]
 */

/**
 * Конкатенирует текущий итератор с другими экземплярами Iter8or.
 * @method concat
 * @memberof Iter8or
 * @instance
 * @param {...Iter8or} iterators - Итераторы для конкатенации.
 * @returns {Iter8or} Новый экземпляр с конкатенированным итератором.
 * @throws {Error} Если любой из предоставленных итераторов не является экземпляром Iter8or.
 * @example
 * const iter1 = new Iter8or([1, 2]);
 * const iter2 = new Iter8or([3, 4]);
 * const concatenated = iter1.concat(iter2);
 * console.log([...concatenated]); // [1, 2, 3, 4]
 */

/**
 * Вычисляет среднее значение элементов итератора.
 * @method avg
 * @memberof Iter8or
 * @instance
 * @param {Function} [fn] - Дополнительная функция маппинга перед вычислением среднего.
 * @returns {number} Среднее значение.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const average = iter.avg();
 * console.log(average); // 2
 */

/**
 * Находит максимальное значение в итераторе.
 * @method max
 * @memberof Iter8or
 * @instance
 * @param {Function} [fn] - Дополнительная функция маппинга перед поиском максимального значения.
 * @returns {number} Максимальное значение.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const maximum = iter.max();
 * console.log(maximum); // 3
 */

/**
 * Находит минимальное значение в итераторе.
 * @method min
 * @memberof Iter8or
 * @instance
 * @param {Function} [fn] - Дополнительная функция маппинга перед поиском минимального значения.
 * @returns {number} Минимальное значение.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const minimum = iter.min();
 * console.log(minimum); // 1
 */

/**
 * Сворачивает элементы итератора, используя предоставленную функцию редукции.
 * @method reduce
 * @memberof Iter8or
 * @instance
 * @param {Function} reducer - Функция редукции.
 * @param {*} [initialValue] - Начальное значение для редукции.
 * @returns {*} Свёрнутое значение.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const sum = iter.reduce((acc, x) => acc + x, 0);
 * console.log(sum); // 6
 */

/**
 * Суммирует элементы итератора.
 * @method sum
 * @memberof Iter8or
 * @instance
 * @param {Function} [fn] - Дополнительная функция маппинга перед суммированием.
 * @returns {number} Сумма элементов.
 * @example
 * const iter = new Iter8or([1, 2, 3]);
 * const totalSum = iter.sum();
 * console.log(totalSum); // 6
 */

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
