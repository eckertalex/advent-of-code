import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { median } from "./utils.ts";

const pointsChecker: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const pointsAutocomplete: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const pairs: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const pairsReverse: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

function part1(rawInput: string): number {
  let lines = rawInput.split("\n");
  let score = 0;

  for (let line of lines) {
    let stack: string[] = [];
    for (let token of line) {
      if (pairs[token]) {
        stack.push(token);
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop();
        } else {
          score += pointsChecker[token];
          break;
        }
      }
    }
  }

  return score;
}

function part2(rawInput: string): number {
  let lines = rawInput.split("\n");
  let scores: number[] = [];

  for (let line of lines) {
    let stack: string[] = [];
    let corrupted = false;
    for (let token of line) {
      if (pairs[token]) {
        stack.push(token);
      } else {
        if (stack[stack.length - 1] === pairsReverse[token]) {
          stack.pop();
        } else {
          corrupted = true;
          break;
        }
      }
    }

    if (!corrupted) {
      let score = 0;
      while (stack.length > 0) {
        let missing = pairs[stack.pop() as string];
        score = score * 5 + pointsAutocomplete[missing];
      }

      scores.push(score);
    }
  }

  return median(scores);
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_10_test.txt";
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
