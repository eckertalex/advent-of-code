import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { sum } from "./utils.ts";

function simulate(fishes: number[], days: number): number {
  let groupedFish: number[] = new Array(9).fill(0);
  fishes.forEach((fish) => groupedFish[fish]++);

  for (let day = 0; day < days; day++) {
    let fishToDouble = groupedFish[0];
    groupedFish.slice(0, -1).forEach((_, idx) => {
      groupedFish[idx] = groupedFish[idx + 1];
    });
    groupedFish[6] += fishToDouble;
    groupedFish[8] = fishToDouble;
  }

  return sum(groupedFish);
}

function part1(rawInput: string): number {
  const fishes = rawInput.split(",").map((i) => parseInt(i));

  return simulate(fishes, 80);
}

function part2(rawInput: string): number {
  const fishes = rawInput.split(",").map((i) => parseInt(i));

  return simulate(fishes, 256);
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_06_test.txt";
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
