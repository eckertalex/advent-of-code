import run from 'aocrunner'

type Fold = { axis: string; value: number }

function parseInput(rawInput: string): { dots: Set<string>; folds: Fold[] } {
  let [dots, folds] = rawInput.split('\n\n')

  return {
    dots: new Set(dots.split('\n')),
    folds: folds.split('\n').map((fold) => {
      let [axis, value] = fold.split('fold along ')[1].split('=')

      return { axis, value: Number(value) }
    }),
  }
}

function fold(dots: Set<string>, fold: Fold) {
  let { axis, value } = fold
  dots.forEach((dot) => {
    let [x, y] = dot.split(',').map(Number)
    let folded = false

    if (axis === 'x' && x > value) {
      x = value - (x - value)
      folded = true
    }

    if (axis === 'y' && y > value) {
      y = value - (y - value)
      folded = true
    }

    if (folded) {
      dots.delete(dot)
      dots.add(`${x},${y}`)
    }
  })
}

function part1(rawInput: string) {
  let { dots, folds } = parseInput(rawInput)

  fold(dots, folds[0])

  return dots.size
}

function part2(rawInput: string) {
  let { dots, folds } = parseInput(rawInput)

  folds.forEach((f) => {
    fold(dots, f)
  })

  let messageGrid = Array.from(Array(6), () => Array(39).fill('.'))
  dots.forEach((dot) => {
    let [x, y] = dot.split(',').map(Number)
    messageGrid[y][x] = '#'
  })

  console.log(messageGrid.map((row) => row.join('')).join('\n'))

  return 'RKHFZGUB'
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
