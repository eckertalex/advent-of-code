/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

function sum(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number, 0)
}

function prod(numbers: number[]) {
  return numbers.reduce((sum, number) => sum * number, 1)
}

function mean(nums: number[]) {
  return sum(nums) / nums.length
}

function median(nums: number[]) {
  let sorted = nums.slice().sort((a, b) => a - b)
  let middle = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }
  return sorted[middle]
}

function createMatrix(size: number) {
  return [...new Array<number>(size)].map(() => new Array<number>(size).fill(0))
}

function transpose2DMatrix(matrix: any[][]) {
  return matrix[0].map((_, i) => matrix.map((x) => x[i]))
}

function flipBits(bits: string) {
  return bits
    .split('')
    .map((bit) => (bit === '1' ? '0' : '1'))
    .join('')
}

function bin(decimal: string) {
  return parseInt(decimal, 2)
}

function neighbors(y: number, x: number, grid: any[][]) {
  let result = []
  for (let dy of [-1, 0, 1]) {
    for (let dx of [-1, 0, 1]) {
      if (dy === 0 && dx === 0) {
        continue
      }
      let ny = y + dy
      let nx = x + dx
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        result.push([ny, nx])
      }
    }
  }
  return result
}

function isLowercase(str: string) {
  return /[a-z]/.test(str)
}

export {
  sum,
  prod,
  mean,
  median,
  createMatrix,
  transpose2DMatrix,
  flipBits,
  bin,
  neighbors,
  isLowercase,
}
