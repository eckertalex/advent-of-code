import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { createMatrix, sum } from "./utils.ts";

type Point = [number, number];
type Vent = [Point, Point];

function toPoint(s: string): Point {
  const parts = s.split(",").map((e) => parseInt(e));
  if (parts.length !== 2 || parts.some((e) => isNaN(e))) {
    throw new Error(`Invalid coordinate: ${s}`);
  }
  return [parts[0], parts[1]];
}

function parseInput(rawInput: string): Vent[] {
  return rawInput.split("\n").map((line) => {
    const [start, end] = line.split("->").map((e) => toPoint(e));
    return [start, end];
  });
}

function drawSegment(vent: Vent, ocean: number[][], diagonals: boolean) {
  let [[b1, a1], [b2, a2]] = vent;
  let x = [a1, a2];
  let y = [b1, b2];

  if (a1 > a2 || (a1 === a2 && b1 > b2)) {
    x = x.reverse();
    y = y.reverse();
  }

  let horizontalOrVertical = x[0] === x[1] || y[0] === y[1];
  if (horizontalOrVertical) {
    for (let i = x[0]; i <= x[1]; i++) {
      for (let j = y[0]; j <= y[1]; j++) {
        ocean[i][j]++;
      }
    }
  } else if (diagonals) {
    let direction = y[0] < y[1] ? 1 : -1;
    let [i, j] = [x[0], y[0]];
    while (i <= x[1]) {
      ocean[i++][j]++;
      j += direction;
    }
  }
}

function drawAllLines(vents: Array<Vent>, diagonals: boolean) {
  let size = Math.max(...vents.flat(2)) + 1;
  let ocean = createMatrix(size);

  vents.forEach((vent) => drawSegment(vent, ocean, diagonals));

  return ocean;
}

function getOverlap(vents: Array<Vent>, diagonals = false) {
  let ocean = drawAllLines(vents, diagonals);

  let overlappingPoints = sum(
    ocean.map((row) => row.filter((p) => p >= 2).length),
  );

  return overlappingPoints;
}

function part1(rawInput: string): number {
  let input = parseInput(rawInput);

  return getOverlap(input);
}

function part2(rawInput: string): number {
  let input = parseInput(rawInput);

  return getOverlap(input, true);
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_05_test.txt";
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
