import run from 'aocrunner'

function parseInput(rawInput: string) {
  return rawInput.split('\n')
}

function part1(rawInput: string) {
  let input = parseInput(rawInput)

  let horizontalPosition = 0
  let depth = 0
  for (let command of input) {
    let [direction, amount] = command.split(' ')
    if (direction === 'forward') {
      horizontalPosition += Number(amount)
    }
    if (direction === 'down') {
      depth += Number(amount)
    }
    if (direction === 'up') {
      depth -= Number(amount)
    }
  }

  return horizontalPosition * depth
}

function part2(rawInput: string) {
  let input = parseInput(rawInput)

  let horizontalPosition = 0
  let depth = 0
  let aim = 0
  for (let command of input) {
    let [direction, amount] = command.split(' ')
    if (direction === 'forward') {
      horizontalPosition += Number(amount)
      depth += aim * Number(amount)
    }
    if (direction === 'down') {
      aim += Number(amount)
    }
    if (direction === 'up') {
      aim -= Number(amount)
    }
  }

  return horizontalPosition * depth
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
