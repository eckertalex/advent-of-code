import run from 'aocrunner'

function parseInput(rawInput: string): {
  polymerPairCounts: Record<string, number>
  rules: { match: string; insert: string }[]
} {
  let [polymer, rules] = rawInput.split('\n\n')

  let polymerPairCounts: Record<string, number> = {}
  for (let i = 0; i < polymer.length - 1; i++) {
    let pair = polymer.substring(i, i + 2)
    let pairFrequency = polymerPairCounts[pair] ?? 0
    polymerPairCounts[pair] = pairFrequency + 1
  }

  return {
    polymerPairCounts,
    rules: rules
      .split('\n')
      .map((line) => line.split(' -> '))
      .map(([match, insert]) => ({ match, insert })),
  }
}

function polymerize(
  polymerPairCounts: Record<string, number>,
  rules: { match: string; insert: string }[],
) {
  let increases: Record<string, number> = {}

  for (let { match, insert } of rules) {
    let insertCount = polymerPairCounts[match] ?? 0

    let newMatch1 = match.charAt(0) + insert
    increases[newMatch1] = (increases[newMatch1] ?? 0) + insertCount

    let newMatch2 = insert + match.charAt(1)
    increases[newMatch2] = (increases[newMatch2] ?? 0) + insertCount

    polymerPairCounts[match] = 0
  }

  for (let [key, increase] of Object.entries(increases)) {
    polymerPairCounts[key] = (polymerPairCounts[key] ?? 0) + increase
  }
}

function countFrequencies(polymerPairCounts: Record<string, number>) {
  let frequencies: Record<string, number> = {}

  for (let [pair, count] of Object.entries(polymerPairCounts)) {
    let elem1 = pair.charAt(0)
    frequencies[elem1] = (frequencies[elem1] ?? 0) + count

    let elem2 = pair.charAt(1)
    frequencies[elem2] = (frequencies[elem2] ?? 0) + count
  }

  for (let [elem, count] of Object.entries(frequencies)) {
    if (count) {
      if (count % 2 === 1) {
        count++
      }

      frequencies[elem] = count / 2
    }
  }

  return frequencies
}

function part1(rawInput: string) {
  let { polymerPairCounts, rules } = parseInput(rawInput)

  let steps = 10
  while (steps--) {
    polymerize(polymerPairCounts, rules)
  }

  let frequencies = countFrequencies(polymerPairCounts)

  return (
    Math.max(...Object.values(frequencies)) -
    Math.min(...Object.values(frequencies))
  )
}

function part2(rawInput: string) {
  let { polymerPairCounts, rules } = parseInput(rawInput)

  let steps = 40
  while (steps--) {
    polymerize(polymerPairCounts, rules)
  }

  let frequencies = countFrequencies(polymerPairCounts)

  return (
    Math.max(...Object.values(frequencies)) -
    Math.min(...Object.values(frequencies))
  )
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
