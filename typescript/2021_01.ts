import { readFileSync } from "node:fs";
import { argv } from "node:process";

function part1(rawInput: string): number {
  const measurements = rawInput.split("\n").map((i) => parseInt(i));

  let count = 0;
  for (let i = 1; i <= measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      count += 1;
    }
  }

  return count;
}

function part2(rawInput: string): number {
  const measurements = rawInput.split("\n").map((i) => parseInt(i));

  let count = 0;
  let prevSum = measurements[2] + measurements[1] + measurements[0];
  for (let i = 3; i <= measurements.length; i++) {
    let sum = measurements[i] + measurements[i - 1] + measurements[i - 2];
    if (sum > prevSum) {
      count += 1;
    }
    prevSum = sum;
  }

  return count;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_01_test.txt";
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
