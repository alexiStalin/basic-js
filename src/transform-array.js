import { NotImplementedError } from '../extensions/index.js'

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr1) {
   if (!Array.isArray(arr1)) {
      throw new Error("'arr' parameter must be an instance of the Array!")
   }
   let arr = arr1
   for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '--discard-next') {
         if (arr[i + 1] === undefined) {
            arr.splice(i)
         } else {
            arr.splice(i, i + 1)
         }
      }

      if (arr[i] === '--discard-prev') {
         if (i == 0) {
            arr.splice(i, 1)
         } else {
            arr.splice(i - 1, i)
         }
      }

      if (arr[i] === '--double-next') {
         if (arr[i + 1] === undefined) {
            arr.splice(i)
         } else {
            arr[i] = arr[i + 1]
         }
      }

      if (arr[i] === '--double-prev') {
         if (i == 0) {
            arr.splice(i, 1)
         } else {
            arr[i] = arr[i - 1]
         }
      }
   }
   return arr
}
