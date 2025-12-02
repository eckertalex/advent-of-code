import { readFileSync } from "node:fs";
import { argv } from "node:process";

function part1(rawInput: string): number {
  const input = rawInput.split("\n");

  let horizontalPosition = 0;
  let depth = 0;
  for (let command of input) {
    let [direction, amount] = command.split(" ");
    if (direction === "forward") {
      horizontalPosition += Number(amount);
    }
    if (direction === "down") {
      depth += Number(amount);
    }
    if (direction === "up") {
      depth -= Number(amount);
    }
  }

  return horizontalPosition * depth;
}

function part2(rawInput: string): number {
  const input = rawInput.split("\n");

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (let command of input) {
    let [direction, amount] = command.split(" ");
    if (direction === "forward") {
      horizontalPosition += Number(amount);
      depth += aim * Number(amount);
    }
    if (direction === "down") {
      aim += Number(amount);
    }
    if (direction === "up") {
      aim -= Number(amount);
    }
  }

  return horizontalPosition * depth;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_02_test.txt";
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
