class Iter8or {
  constructor(iterable) {

    if (typeof iterable === 'number') {
      // TODO add optimization && remove rewriting the prop
      iterable = Array.from({ length: iterable }, (_, i) => i);
    } else if (!iterable[Symbol.iterator]) {
      throw new TypeError('Provided iterable argument is not iterable');
    }
    this.iterable = iterable;
  }

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]();
  }

  map(fn) {
    const mappedArray = [];
    for (const item of this) {
      mappedArray.push(fn(item));
    }
    return new Iter8or(mappedArray);
  }

  filter(fn) {
    const filteredArray = [];
    for (const item of this) {
      if (fn(item)) {
        filteredArray.push(item);
      }
    }
    return new Iter8or(filteredArray);
  }
  
  collect(target = []) {
    if (target instanceof Array) {
      for (const item of this) {
        target.push(item);
      }
    } else if (target instanceof Set) {
      for (const item of this.iterable) {
        target.add(item);
      }
    } else if (target instanceof Map) {
      for (const item of this.iterable) {
        target.set(item, item);
      }
    } else if (target instanceof Object) {
      for (const item of this.iterable) {
        target[item] = item;
      }
    }
    return target;
  }

  // TODO может быть бесконечная рекурсия
  flatMap(fn) {
    const flatMappedArray = [];
    for (const item of this.iterable) {
      if (item[Symbol.iterator]) {
        flatMappedArray.push(...new Iter8or(item).flatMap(fn));
      } else {
        flatMappedArray.push(fn(item));
      }
    }
    return new Iter8or(flatMappedArray);
  }
}
 