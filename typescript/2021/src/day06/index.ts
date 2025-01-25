import run from 'aocrunner'

function parseInput(rawInput: string) {
  return rawInput.split(',').map(Number)
}

function simulate(fishes: number[], days: number) {
  let groupedFish: number[] = new Array(9).fill(0)
  fishes.forEach((fish) => groupedFish[fish]++)

  for (let day = 0; day < days; day++) {
    let fishToDouble = groupedFish[0]
    groupedFish.slice(0, -1).forEach((_, idx) => {
      groupedFish[idx] = groupedFish[idx + 1]
    })
    groupedFish[6] += fishToDouble
    groupedFish[8] = fishToDouble
  }

  return groupedFish.reduce((fishes, group) => fishes + group, 0)
}

function part1(rawInput: string) {
  let fishes = parseInput(rawInput)
  return String(simulate(fishes, 80))
}

function part2(rawInput: string) {
  let fishes = parseInput(rawInput)
  return String(simulate(fishes, 256))
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
