const createSyncMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.iterator]) {
    throw new TypeError('first argument must be an iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('second argument must be a function');
  }

  const iterator = iterable[Symbol.iterator]();

  return {
    next() {
      const { value, done } = iterator.next();
      return done
        ? { value: undefined, done: true }
        : { value: fn(value), done: false };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

const createAsyncMapIterator = (iterable, fn) => {
  if (!iterable[Symbol.asyncIterator]) {
    throw new TypeError('First argument must be an async iterable or iterable');
  }

  if (typeof fn !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const iterator = iterable[Symbol.asyncIterator]();

  return {
    async next() {
      const { value, done } = await iterator.next();
      return done
        ? { value: undefined, done: true }
        : { value: await fn(value), done: false };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
};

/**
 * Создает итератор, который применяет функцию ко всем элементам входного итератора.
 * @function
 * @param {Iterable|AsyncIterable} iterable - Исходный итератор.
 * @param {Function} fn - Функция, применяемая к каждому элементу итератора.
 * @returns {Object} Итератор, который возвращает элементы, полученные применением функции `fn`.
 * @throws {TypeError} Если первый аргумент не является итератором, или второй аргумент не является функцией.
 * @example
 * // Пример использования через класс Iter8or:
 * const iter = new Iter8or([1, 2, 3]);
 * const mapped = iter.map(x => x * 2);
 * console.log([...mapped]); // [2, 4, 6]
 */
export default function createMapIterator(iterable, fn) {
  return typeof iterable[Symbol.asyncIterator] === 'function'
    ? createAsyncMapIterator(iterable, fn)
    : createSyncMapIterator(iterable, fn);
}
