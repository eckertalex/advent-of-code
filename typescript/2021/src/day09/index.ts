import run from 'aocrunner'
import { sum, prod } from '../utils/index.js'

function parseInput(rawInput: string) {
  return rawInput.split('\n').map((line) => line.split('').map(Number))
}

const neighbors = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

function isLowPoint(heightMap: number[][], rowIndex: number, colIndex: number) {
  let height = heightMap[rowIndex][colIndex]

  return neighbors.every(
    ([r, c]) =>
      !isOutOfBounds(heightMap, rowIndex, colIndex) &&
      height < (heightMap[rowIndex + r]?.[colIndex + c] ?? Number.MAX_VALUE),
  )
}

function getLowPointLocations(heightMap: number[][]) {
  let basinLocations: number[][] = []

  heightMap.forEach((row, rowIndex) =>
    row.forEach((_, colIndex) => {
      if (isLowPoint(heightMap, rowIndex, colIndex)) {
        basinLocations.push([rowIndex, colIndex])
      }
    }),
  )

  return basinLocations
}

function part1(rawInput: string) {
  let heightMap = parseInput(rawInput)
  let lowPointLocations = getLowPointLocations(heightMap)

  return String(
    sum(lowPointLocations.map(([row, col]) => heightMap[row][col] + 1)),
  )
}
function isOutOfBounds(
  heightmap: number[][],
  rowIndex: number,
  colIndex: number,
) {
  const [rows, cols] = [heightmap.length, heightmap[0].length]
  return !(0 <= rowIndex && rowIndex < rows && 0 <= colIndex && colIndex < cols)
}

function getBasinSize(
  heightMap: number[][],
  rowIndex: number,
  colIndex: number,
  visited: Set<string>,
): number {
  let basinKey = `${rowIndex},${colIndex}`
  if (
    isOutOfBounds(heightMap, rowIndex, colIndex) ||
    heightMap[rowIndex]?.[colIndex] === 9 ||
    visited.has(basinKey)
  ) {
    return 0
  }

  visited.add(basinKey)
  return (
    1 +
    sum(
      neighbors.map(([r, c]) =>
        getBasinSize(heightMap, rowIndex + r, colIndex + c, visited),
      ),
    )
  )
}

function part2(rawInput: string) {
  let heightMap = parseInput(rawInput)
  let lowPointLocations = getLowPointLocations(heightMap)

  let visited = new Set<string>()
  let basinSizes = lowPointLocations
    .map(([row, col]) => getBasinSize(heightMap, row, col, visited))
    .sort((a, b) => a - b)

  return String(prod(basinSizes.slice(-3)))
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
