import run from 'aocrunner'

function parseInput(rawInput: string) {
  return rawInput.split(',').map(Number)
}

function part1(rawInput: string) {
  let crabs = parseInput(rawInput).sort((a, b) => a - b)
  const median = crabs[crabs.length / 2]

  let minFuel = crabs.reduce((acc, val) => acc + Math.abs(val - median), 0)

  return String(minFuel)
}

function part2(rawInput: string) {
  let crabs = parseInput(rawInput)

  const mean = Math.floor(
    crabs.reduce((acc, val) => acc + val, 0) / crabs.length,
  )

  let minFuel = crabs.reduce((acc, val) => {
    const distance = Math.abs(val - mean)
    const consumption = (distance * (distance + 1)) / 2

    return acc + consumption
  }, 0)

  return String(minFuel)
}

run({
  part1: {
    tests: [
      // { input: ``, expected: '' }
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
