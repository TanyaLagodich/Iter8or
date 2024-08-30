# Iter8or

`Iter8or` — это универсальный класс, который предоставляет различные методы для работы с итераторами, как синхронными, так и асинхронными. Этот класс позволяет выполнять такие операции, как фильтрация, маппинг, объединение, сворачивание и другие, используя различные итераторы.

## Конструктор
```
constructor(iterable, options = {})
```
- `iterable`: **_Итерабельный_ объект**, который будет использоваться в качестве исходного набора данных.
- `options`: **Объект** с дополнительными опциями.
  - `digits`: **boolean** (_по умолчанию **false**_) — если true, создается итератор по цифрам числа.
  - `async`: **boolean** (_по умолчанию **false**_) — если true, создается асинхронный итератор.

### Исключения:
- Генерируется **TypeError**, если iterable — это null, undefined, boolean или function.

## Методы

- `map(fn)`
    Применяет функцию _**fn**_ ко всем элементам итератора и возвращает новый _Iter8or_.
    - `fn`: Функция, применяемая к каждому элементу итератора.
```javascript
const iter = new Iter8or([1, 2, 3]);
const mapped = iter.map(x => x * 2);
console.log([...mapped]); // [2, 4, 6]
```

- `filter(predicate)`
  Фильтрует элементы итератора на основе предиката и возвращает новый Iter8or.
    - `predicate`: Функция, возвращающая true для элементов, которые нужно оставить, и false для тех, которые нужно отфильтровать.

```javascript
const iter = new Iter8or([1, 2, 3, 4]);
const filtered = iter.filter(x => x % 2 === 0);
console.log([...filtered]); // [2, 4]
```

- `drop(n)`
  Пропускает первые **n** элементов итератора и возвращает новый **Iter8or**.
  - `n`: Число элементов, которые нужно пропустить.

```javascript
const iter = new Iter8or([1, 2, 3, 4]);
const dropped = iter.drop(2);
console.log([...dropped]); // [3, 4]
```

- `flatMap(fn)`
  Применяет функцию **fn** к каждому элементу и разворачивает результирующие итераторы, возвращая новый **Iter8or**.
    - `fn`: Функция, которая возвращает итератор для каждого элемента.

```javascript
const iter = new Iter8or([1, 2, 3]);
const flatMapped = iter.flatMap(x => [x, x * 2]);
console.log([...flatMapped]); // [1, 2, 2, 4, 3, 6]
```

- `flat(depth)`
    Разворачивает вложенные итераторы до указанной глубины и возвращает новый **Iter8or**.
    - `depth`: Глубина разворачивания (по умолчанию 1).

```javascript
const iter = new Iter8or([1, [2, [3, 4]]]);
const flattened = iter.flat(2);
console.log([...flattened]); // [1, 2, 3, 4]
```

- `reverse()`
  Возвращает новый **Iter8or** с элементами в обратном порядке.

```javascript
const iter = new Iter8or([1, 2, 3]);
const reversed = iter.reverse();
console.log([...reversed]); // [3, 2, 1]
```

- `take(n)`
    Возвращает новый **Iter8or** с первыми **n** элементами итератора.
    - `n`: Число элементов, которые нужно взять.

```javascript
const iter = new Iter8or([1, 2, 3, 4]);
const taken = iter.take(2);
console.log([...taken]); // [1, 2]
```

- `concat(...iterators)`
Объединяет несколько итераторов и возвращает новый **Iter8or**.
    - `...iterators`: Один или несколько объектов типа Iter8or, которые нужно объединить.

```javascript
const iter1 = new Iter8or([1, 2]);
const iter2 = new Iter8or([3, 4]);
const concatenated = iter1.concat(iter2);
console.log([...concatenated]); // [1, 2, 3, 4]
```

- `avg(fn)` 
    Возвращает среднее значение элементов итератора, с возможностью применения функции fn к каждому элементу.
    - `fn`: Функция, применяемая к каждому элементу перед вычислением среднего значения (необязательно).

```javascript
const iter = new Iter8or([1, 2, 3]);
const average = iter.avg();
console.log(average); // 2
```

- `max(fn)`
    Возвращает максимальное значение элементов итератора, с возможностью применения функции fn к каждому элементу.
    - `fn`: Функция, применяемая к каждому элементу перед вычислением максимального значения (необязательно).

```javascript
const iter = new Iter8or([1, 2, 3]);
const maximum = iter.max();
console.log(maximum); // 3
```

- `min(fn)`
  Возвращает минимальное значение элементов итератора, с возможностью применения функции fn к каждому элементу.
    - `fn`: Функция, применяемая к каждому элементу перед вычислением минимального значения (необязательно).
```javascript
const iter = new Iter8or([1, 2, 3]);
const minimum = iter.min();
console.log(minimum); // 1
```

- `reduce(reducer, initialValue)`
    Сводит элементы итератора к одному значению, используя функцию **reducer** и начальное значение **initialValue**.
    - `reducer`: Функция свертки, принимающая аккумулятор и текущий элемент.
    - `initialValue`: Начальное значение аккумулятора.

```javascript
const iter = new Iter8or([1, 2, 3]);
const sum = iter.reduce((acc, x) => acc + x, 0);
console.log(sum); // 6
```

- `sum(fn)`
    Возвращает сумму элементов итератора, с возможностью применения функции fn к каждому элементу.
    - `fn`: Функция, применяемая к каждому элементу перед вычислением суммы (необязательно).

```javascript
const iter = new Iter8or([1, 2, 3]);
const totalSum = iter.sum();
console.log(totalSum); // 6
```
