import { readFileSync } from "node:fs";
import { argv } from "node:process";

function part1(rawInput: string): number {
  const input = rawInput.split("\n");

  return 0;
}

function part2(rawInput: string): number {
  const input = rawInput.split("\n");

  return 0;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/YYYY_DD_test.txt";
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
