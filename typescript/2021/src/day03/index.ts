import run from 'aocrunner'
import { flipBits, bin } from '../utils/index.js'

function parseInput(rawInput: string) {
  return rawInput.split('\n')
}

function getGammaRate(lines: string[]) {
  let gammaRate = ''
  let length = lines[0].length

  for (let i = 0; i < length; i++) {
    let zeros = 0
    let ones = 0

    for (let line of lines) {
      if (line[i] === '1') {
        ones += 1
      } else {
        zeros += 1
      }
    }

    gammaRate += zeros > ones ? '0' : '1'
    zeros = 0
    ones = 0
  }

  return gammaRate
}

function part1(rawInput: string) {
  let input = parseInput(rawInput)
  let gammaRate = getGammaRate(input)
  let epsilonRate = flipBits(gammaRate)

  return bin(gammaRate) * bin(epsilonRate)
}

function getOxygenGeneratorRating(lines: string[]) {
  let length = lines[0].length

  for (let i = 0; i < length; i++) {
    let zeros = 0
    let ones = 0

    lines = lines.filter(Boolean)
    if (lines.length === 1) {
      break
    }

    lines.forEach((line) => {
      if (line[i] === '1') {
        ones += 1
      } else {
        zeros += 1
      }
    })

    if (ones >= zeros) {
      lines.forEach((line, idx) => {
        if (line[i] === '0') {
          delete lines[idx]
        }
      })
    } else {
      lines.forEach((line, idx) => {
        if (line[i] === '1') {
          delete lines[idx]
        }
      })
    }

    zeros = 0
    ones = 0
  }

  return lines.filter(Boolean)[0]
}

function getCo2ScrubberRating(lines: string[]) {
  let length = lines[0].length

  for (let i = 0; i < length; i++) {
    let zeros = 0
    let ones = 0

    lines = lines.filter(Boolean)
    if (lines.length === 1) {
      break
    }

    lines.forEach((line) => {
      if (line[i] === '1') {
        ones += 1
      } else {
        zeros += 1
      }
    })

    if (ones >= zeros) {
      lines.forEach((line, idx) => {
        if (line[i] === '1') {
          delete lines[idx]
        }
      })
    } else {
      lines.forEach((line, idx) => {
        if (line[i] === '0') {
          delete lines[idx]
        }
      })
    }

    zeros = 0
    ones = 0
  }

  return lines.filter(Boolean)[0]
}

function part2(rawInput: string) {
  let input = parseInput(rawInput)
  let oxygenGeneratorRating = getOxygenGeneratorRating([...input])
  let co2ScrubberRating = getCo2ScrubberRating([...input])

  return bin(oxygenGeneratorRating) * bin(co2ScrubberRating)
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
