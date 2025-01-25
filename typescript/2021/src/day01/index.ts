import run from 'aocrunner'

function parseInput(rawInput: string) {
  return rawInput.split('\n').map(Number)
}

function part1(rawInput: string) {
  let measurements = parseInput(rawInput)

  let count = 0
  for (let i = 1; i <= measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      count += 1
    }
  }

  return String(count)
}

function part2(rawInput: string) {
  let measurements = parseInput(rawInput)

  let count = 0
  let prevSum = measurements[2] + measurements[1] + measurements[0]
  for (let i = 3; i <= measurements.length; i++) {
    let sum = measurements[i] + measurements[i - 1] + measurements[i - 2]
    if (sum > prevSum) {
      count += 1
    }
    prevSum = sum
  }

  return String(count)
}

run({
  part1: {
    // tests: [{ input: ``, expected: '' }],
    solution: part1,
  },
  part2: {
    // tests: [{ input: ``, expected: '' }],
    solution: part2,
  },
  trimTestInputs: true,
})
