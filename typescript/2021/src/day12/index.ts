import run from 'aocrunner'
import { isLowercase } from '../utils/index.js'

function parseInput(rawInput: string) {
  let connections = rawInput.split('\n')

  let caveMap: Record<string, string[]> = {}
  for (let connection of connections) {
    let [caveA, caveB] = connection.split('-')

    if (!caveMap[caveB]) {
      caveMap[caveB] = []
    }

    if (!caveMap[caveA]) {
      caveMap[caveA] = []
    }

    caveMap[caveB].push(caveA)
    caveMap[caveA].push(caveB)
  }

  return caveMap
}

function findPaths(
  cave: string,
  path: string[],
  paths: string[][],
  caveMap: Record<string, string[]>,
) {
  let nextPath = [...path, cave]

  if (cave === 'end') {
    paths.push(nextPath)
    return
  }

  caveMap[cave].forEach((c) => {
    if (isLowercase(c) && path.includes(c)) {
      return
    }
    findPaths(c, nextPath, paths, caveMap)
  })
}

function part1(rawInput: string) {
  let caveMap = parseInput(rawInput)

  let paths: string[][] = []
  findPaths('start', [], paths, caveMap)

  return paths.length
}

function findPathsWithRevisit(
  cave: string,
  path: string[],
  flag: boolean,
  paths: string[][],
  caveMap: Record<string, string[]>,
) {
  let nextPath = [...path, cave]

  if (cave === 'end') {
    paths.push(nextPath)
    return
  }

  caveMap[cave].forEach((c) => {
    if (c === 'start') {
      return
    }

    let nextFlag = flag
    if (isLowercase(c)) {
      if (path.includes(c)) {
        if (nextFlag) {
          return
        }
        nextFlag = true
      }
    }

    findPathsWithRevisit(c, nextPath, nextFlag, paths, caveMap)
  })
}

function part2(rawInput: string) {
  let caveMap = parseInput(rawInput)

  let paths: string[][] = []
  findPathsWithRevisit('start', [], false, paths, caveMap)

  return paths.length
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
