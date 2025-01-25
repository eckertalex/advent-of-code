import run from 'aocrunner'
import { neighbors } from '../utils/index.js'

function parseInput(rawInput: string) {
  return rawInput.split('\n').map((line) => line.split('').map(Number))
}

function step(octopuses: number[][]) {
  let stack: [number, number][] = []
  let flashes = 0

  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      if (++octopuses[row][col] > 9) {
        stack.push([row, col])
      }
    }
  }

  while (stack.length > 0) {
    let [row, col] = stack.pop()
    flashes++

    for (let [nrow, ncol] of neighbors(row, col, octopuses)) {
      if (++octopuses[nrow][ncol] === 10) {
        stack.push([nrow, ncol])
      }
    }
  }

  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      if (octopuses[row][col] > 9) {
        octopuses[row][col] = 0
      }
    }
  }

  return flashes
}

function part1(rawInput: string) {
  let octopuses = parseInput(rawInput)

  let countFlashes = 0
  for (let s = 0; s < 100; s++) {
    countFlashes += step(octopuses)
  }

  return countFlashes
}

function isSimultaneousFlash(octopuses: number[][]) {
  return octopuses.every((row) => row.every((octopus) => octopus === 0))
}
function part2(rawInput: string) {
  let octopuses = parseInput(rawInput)

  let steps = 0
  while (!isSimultaneousFlash(octopuses)) {
    step(octopuses)
    steps++
  }

  return steps
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
