import run from 'aocrunner'
import { createMatrix, sum } from '../utils/index.js'

type Vent = number[][]

function parseInput(rawInput: string) {
  return rawInput
    .split('\n')
    .map((line) => line.split('->'))
    .map((line) => line.map((e) => e.split(',').map(Number)))
}

function drawSegment(vent: Vent, ocean: number[][], diagonals: boolean) {
  let [[b1, a1], [b2, a2]] = vent
  let x = [a1, a2]
  let y = [b1, b2]

  if (a1 > a2 || (a1 === a2 && b1 > b2)) {
    x = x.reverse()
    y = y.reverse()
  }

  let horizontalOrVertical = x[0] === x[1] || y[0] === y[1]
  if (horizontalOrVertical) {
    for (let i = x[0]; i <= x[1]; i++) {
      for (let j = y[0]; j <= y[1]; j++) {
        ocean[i][j]++
      }
    }
  } else if (diagonals) {
    let direction = y[0] < y[1] ? 1 : -1
    let [i, j] = [x[0], y[0]]
    while (i <= x[1]) {
      ocean[i++][j]++
      j += direction
    }
  }
}

function drawAllLines(vents: Vent[], diagonals: boolean) {
  let size = Math.max(...vents.flat(2)) + 1
  let ocean = createMatrix(size)

  vents.forEach((vent) => drawSegment(vent, ocean, diagonals))

  return ocean
}

function getOverlap(vents: Vent[], diagonals = false) {
  let ocean = drawAllLines(vents, diagonals)

  let overlappingPoints = sum(
    ocean.map((row) => row.filter((p) => p >= 2).length),
  )

  return overlappingPoints
}

function part1(rawInput: string) {
  let input = parseInput(rawInput)

  return getOverlap(input)
}

function part2(rawInput: string) {
  let input = parseInput(rawInput)

  return getOverlap(input, true)
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
