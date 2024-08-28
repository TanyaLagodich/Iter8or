import { convertToAsyncIterator } from '../../../utils/convertToAsyncIterator.js';


const emptyArray = [];

const syncArray = [1, 2, 3, 4, 5];

const asyncArray = [
    () => Promise.resolve(1),
    () => new Promise(resolve => setTimeout(() => resolve(2), 1000)),
    () => Promise.resolve(3),
];

const createAsyncIterator = (iterator) => convertToAsyncIterator(iterator);

export {
    emptyArray,
    syncArray,
    asyncArray,
    createAsyncIterator,
}
