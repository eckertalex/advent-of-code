import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { sum } from "./utils.ts";

function part1(rawInput: string): number {
  const crabs = rawInput
    .split(",")
    .map((i) => parseInt(i))
    .sort((a, b) => a - b);
  const median = crabs[crabs.length / 2];

  let minFuel = crabs.reduce((acc, val) => acc + Math.abs(val - median), 0);

  return minFuel;
}

function part2(rawInput: string): number {
  const crabs = rawInput.split(",").map((i) => parseInt(i));

  const mean = Math.floor(sum(crabs) / crabs.length);

  let minFuel = crabs.reduce((acc, val) => {
    const distance = Math.abs(val - mean);
    const consumption = (distance * (distance + 1)) / 2;

    return acc + consumption;
  }, 0);

  return minFuel;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_07_test.txt";
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
