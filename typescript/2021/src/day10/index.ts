import run from 'aocrunner'
import { median } from '../utils/index.js'

function parseInput(rawInput: string) {
  return rawInput.split('\n')
}

const pointsChecker: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const pointsAutocomplete: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const pairs: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const pairsReverse: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

function part1(rawInput: string) {
  let lines = parseInput(rawInput)
  let score = 0

  for (let line of lines) {
    let stack = []
    for (let token of line) {
      if (pairs[token]) {
        stack.push(token)
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop()
        } else {
          score += pointsChecker[token]
          break
        }
      }
    }
  }

  return score
}

function part2(rawInput: string) {
  let lines = parseInput(rawInput)
  let scores = []

  for (let line of lines) {
    let stack = []
    let corrupted = false
    for (let token of line) {
      if (pairs[token]) {
        stack.push(token)
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop()
        } else {
          corrupted = true
          break
        }
      }
    }

    if (!corrupted) {
      let score = 0
      while (stack.length > 0) {
        let missing = pairs[stack.pop() as string]
        score = score * 5 + pointsAutocomplete[missing]
      }

      scores.push(score)
    }
  }

  return median(scores)
}

run({
  part1: {
    tests: [
      // { input: ``, expected: '', },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: '', },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
