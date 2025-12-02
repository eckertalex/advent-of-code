import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { neighbors } from "./utils.ts";

function step(octopuses: number[][]): number {
  let stack: [number, number][] = [];
  let flashes = 0;

  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      if (++octopuses[row][col] > 9) {
        stack.push([row, col]);
      }
    }
  }

  while (stack.length > 0) {
    let [row, col] = stack.pop() || [-1, -1];
    flashes++;

    for (let [nrow, ncol] of neighbors(row, col, octopuses)) {
      if (++octopuses[nrow][ncol] === 10) {
        stack.push([nrow, ncol]);
      }
    }
  }

  for (let row = 0; row < octopuses.length; row++) {
    for (let col = 0; col < octopuses[row].length; col++) {
      if (octopuses[row][col] > 9) {
        octopuses[row][col] = 0;
      }
    }
  }

  return flashes;
}

function part1(rawInput: string): number {
  let octopuses = rawInput
    .split("\n")
    .map((line) => line.split("").map((e) => parseInt(e)));

  let countFlashes = 0;
  for (let s = 0; s < 100; s++) {
    countFlashes += step(octopuses);
  }

  return countFlashes;
}

function isSimultaneousFlash(octopuses: number[][]): boolean {
  return octopuses.every((row) => row.every((octopus) => octopus === 0));
}

function part2(rawInput: string): number {
  let octopuses = rawInput
    .split("\n")
    .map((line) => line.split("").map((e) => parseInt(e)));

  let steps = 0;
  while (!isSimultaneousFlash(octopuses)) {
    step(octopuses);
    steps++;
  }

  return steps;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_11_test.txt";
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
