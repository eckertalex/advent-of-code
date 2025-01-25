import run from 'aocrunner'
import { sum, transpose2DMatrix } from '../utils/index.js'

type Entry = {
  number: number
  marked: boolean
}

type Board = Entry[][]

function parseInput(rawInput: string): {
  drawOrder: number[]
  boards: Board[]
} {
  let [numbers, ...boards] = rawInput.split('\n\n')

  return {
    drawOrder: numbers.split(',').map(Number),
    boards: boards.map((board) =>
      board
        .trim()
        .split('\n')
        .map((row) =>
          row
            .trim()
            .split(/\ +/)
            .map((number) => ({ number: +number, marked: false })),
        ),
    ),
  }
}

function mark(number: number, board: Board) {
  for (let row of board) {
    let index = row.findIndex((entry) => entry.number === number)
    if (index !== -1) {
      row[index].marked = true
    }
  }
}

function checkRows(board: Board) {
  for (let row of board) {
    if (sum(row.map((entry) => (entry.marked ? 1 : 0))) === 5) {
      return true
    }
  }
  return false
}

function isBingo(board: Board) {
  return checkRows(board) || checkRows(transpose2DMatrix(board))
}

function sumUnmarked(board: Board) {
  return sum(
    board
      .flat()
      .filter((entry) => !entry.marked)
      .map((entry) => entry.number),
  )
}

function getWinningScore(
  drawOrder: number[],
  boards: Board[],
  mode: 'first' | 'last',
) {
  let winningBoards = new Array<number>(boards.length).fill(0)

  for (let num of drawOrder) {
    let i = 0
    for (let board of boards) {
      mark(num, board)
      let win = isBingo(board)
      let score = num * sumUnmarked(board)

      switch (mode) {
        case 'first':
          if (win) {
            return score
          }
        case 'last':
          if (win) {
            winningBoards[i] = 1
          }
          if (sum(winningBoards) === winningBoards.length) {
            return score
          }
      }

      i++
    }
  }
  return NaN
}

function part1(rawInput: string) {
  let { drawOrder, boards } = parseInput(rawInput)

  return getWinningScore(drawOrder, boards, 'first')
}

function part2(rawInput: string) {
  let { drawOrder, boards } = parseInput(rawInput)

  return getWinningScore(drawOrder, boards, 'last')
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
