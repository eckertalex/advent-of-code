import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { sum, transpose2DMatrix } from "./utils.ts";

type Entry = {
  number: number;
  marked: boolean;
};

type Board = Entry[][];

function parseInput(rawInput: string): {
  drawOrder: number[];
  boards: Board[];
} {
  let [numbers, ...boards] = rawInput.split("\n\n");

  return {
    drawOrder: numbers.split(",").map((e) => parseInt(e)),
    boards: boards.map((board) =>
      board
        .trim()
        .split("\n")
        .map((row) =>
          row
            .trim()
            .split(/\ +/)
            .map((number) => ({ number: +number, marked: false })),
        ),
    ),
  };
}

function mark(number: number, board: Board) {
  for (let row of board) {
    let index = row.findIndex((entry) => entry.number === number);
    if (index !== -1) {
      row[index].marked = true;
    }
  }
}

function checkRows(board: Board) {
  for (let row of board) {
    if (sum(row.map((entry) => (entry.marked ? 1 : 0))) === 5) {
      return true;
    }
  }
  return false;
}

function isBingo(board: Board) {
  return checkRows(board) || checkRows(transpose2DMatrix(board));
}

function sumUnmarked(board: Board) {
  return sum(
    board
      .flat()
      .filter((entry) => !entry.marked)
      .map((entry) => entry.number),
  );
}

function getWinningScore(
  drawOrder: number[],
  boards: Board[],
  mode: "first" | "last",
) {
  let winningBoards = new Array<number>(boards.length).fill(0);

  for (let num of drawOrder) {
    let i = 0;
    for (let board of boards) {
      mark(num, board);
      let win = isBingo(board);
      let score = num * sumUnmarked(board);

      switch (mode) {
        case "first":
          if (win) {
            return score;
          }
        case "last":
          if (win) {
            winningBoards[i] = 1;
          }
          if (sum(winningBoards) === winningBoards.length) {
            return score;
          }
      }

      i++;
    }
  }

  return NaN;
}

function part1(rawInput: string): number {
  let { drawOrder, boards } = parseInput(rawInput);

  return getWinningScore(drawOrder, boards, "first");
}

function part2(rawInput: string): number {
  let { drawOrder, boards } = parseInput(rawInput);

  return getWinningScore(drawOrder, boards, "last");
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_04_test.txt";
    const input = readFileSync(filePath, "utf8").trim();

    const solution1 = part1(input);
    const solution2 = part2(input);
    console.log("P1:", solution1);
    console.log("P2:", solution2);
  } catch (error) {
    console.log("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
