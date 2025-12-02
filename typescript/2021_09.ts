import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { sum, prod } from "./utils.ts";

const neighbors: Array<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isLowPoint(
  heightMap: number[][],
  rowIndex: number,
  colIndex: number,
): boolean {
  let height = heightMap[rowIndex][colIndex];

  return neighbors.every(
    ([r, c]) =>
      !isOutOfBounds(heightMap, rowIndex, colIndex) &&
      height < (heightMap[rowIndex + r]?.[colIndex + c] ?? Number.MAX_VALUE),
  );
}

function getLowPointLocations(heightMap: number[][]): number[][] {
  let basinLocations: number[][] = [];

  heightMap.forEach((row, rowIndex) =>
    row.forEach((_, colIndex) => {
      if (isLowPoint(heightMap, rowIndex, colIndex)) {
        basinLocations.push([rowIndex, colIndex]);
      }
    }),
  );

  return basinLocations;
}

function part1(rawInput: string): number {
  let heightMap = rawInput
    .split("\n")
    .map((line) => line.split("").map((e) => parseInt(e)));
  let lowPointLocations = getLowPointLocations(heightMap);

  return sum(lowPointLocations.map(([row, col]) => heightMap[row][col] + 1));
}

function isOutOfBounds(
  heightmap: number[][],
  rowIndex: number,
  colIndex: number,
): boolean {
  const [rows, cols] = [heightmap.length, heightmap[0].length];
  return !(
    0 <= rowIndex &&
    rowIndex < rows &&
    0 <= colIndex &&
    colIndex < cols
  );
}

function getBasinSize(
  heightMap: number[][],
  rowIndex: number,
  colIndex: number,
  visited: Set<string>,
): number {
  let basinKey = `${rowIndex},${colIndex}`;
  if (
    isOutOfBounds(heightMap, rowIndex, colIndex) ||
    heightMap[rowIndex]?.[colIndex] === 9 ||
    visited.has(basinKey)
  ) {
    return 0;
  }

  visited.add(basinKey);
  return (
    1 +
    sum(
      neighbors.map(([r, c]) =>
        getBasinSize(heightMap, rowIndex + r, colIndex + c, visited),
      ),
    )
  );
}

function part2(rawInput: string): number {
  let heightMap = rawInput
    .split("\n")
    .map((line) => line.split("").map((e) => parseInt(e)));
  let lowPointLocations = getLowPointLocations(heightMap);

  let visited = new Set<string>();
  let basinSizes = lowPointLocations
    .map(([row, col]) => getBasinSize(heightMap, row, col, visited))
    .sort((a, b) => a - b);

  return prod(basinSizes.slice(-3));
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_09_test.txt";
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
