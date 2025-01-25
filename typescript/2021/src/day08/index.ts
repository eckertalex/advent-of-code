import run from 'aocrunner'

function parseInput(rawInput: string) {
  return rawInput.split('\n')
}

function part1(rawInput: string) {
  let digits = parseInput(rawInput).flatMap((line) =>
    line.split('|')[1].trim().split(' '),
  )

  let count = 0
  for (let digit of digits) {
    if ([2, 3, 4, 7].some((d) => digit.length === d)) {
      count++
    }
  }

  return count
}

function hasLength(value: number) {
  return (signal: string) => signal.length === value
}

function part2(rawInput: string) {
  let lines = parseInput(rawInput).map((line) => {
    let [uniqueSignals, output] = line
      .split('|')
      .map((e) => e.trim().split(' '))

    return {
      uniqueSignals,
      output: output.map((signal) => signal.split('').sort().join('')),
    }
  })

  let sumOfOutput = 0
  for (let { uniqueSignals, output } of lines) {
    let one = uniqueSignals.find(hasLength(2))?.split('')
    let four = uniqueSignals.find(hasLength(4))?.split('')
    let seven = uniqueSignals.find(hasLength(3))?.split('')
    let eight = uniqueSignals.find(hasLength(7))?.split('')

    let twoOrThreeOrFive = uniqueSignals
      .filter(hasLength(5))
      .map((signal) => signal.split(''))
    let zeroOrSixOrNine = uniqueSignals
      .filter(hasLength(6))
      .map((signal) => signal.split(''))

    let topLeftOrMiddle = four?.filter((signal) => !one?.includes(signal))

    let three = twoOrThreeOrFive.find((signal) =>
      one?.every((segment) => signal.includes(segment)),
    )
    let twoOrFive = twoOrThreeOrFive.filter((signal) => signal !== three)

    let topLeft = topLeftOrMiddle?.find((segment) => !three?.includes(segment))
    let middle = topLeftOrMiddle?.find((segment) => segment !== topLeft)

    let zero = zeroOrSixOrNine?.find(
      (signal) => middle && !signal.includes(middle),
    )
    let sixOrNine = zeroOrSixOrNine?.filter((signal) => signal !== zero)

    let nine = sixOrNine.find((signal) =>
      one?.every((segment) => signal.includes(segment)),
    )
    let six = sixOrNine.find((signal) => signal !== nine)

    let two = twoOrFive.find((signal) => topLeft && !signal.includes(topLeft))
    let five = twoOrFive.find((signal) => signal !== two)

    let digits = new Map([
      [zero?.sort().join(''), '0'],
      [one?.sort().join(''), '1'],
      [two?.sort().join(''), '2'],
      [three?.sort().join(''), '3'],
      [four?.sort().join(''), '4'],
      [five?.sort().join(''), '5'],
      [six?.sort().join(''), '6'],
      [seven?.sort().join(''), '7'],
      [eight?.sort().join(''), '8'],
      [nine?.sort().join(''), '9'],
    ])

    let value = +output.map((signal) => digits.get(signal)).join('')

    sumOfOutput += value
  }

  return sumOfOutput
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
