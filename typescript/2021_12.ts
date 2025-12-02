import { readFileSync } from "node:fs";
import { argv } from "node:process";

function isLowercase(str: string): boolean {
  return /[a-z]/.test(str);
}

function parseInput(rawInput: string): Record<string, string[]> {
  let connections = rawInput.split("\n");

  let caveMap: Record<string, string[]> = {};
  for (let connection of connections) {
    let [caveA, caveB] = connection.split("-");

    if (!caveMap[caveB]) {
      caveMap[caveB] = [];
    }

    if (!caveMap[caveA]) {
      caveMap[caveA] = [];
    }

    caveMap[caveB].push(caveA);
    caveMap[caveA].push(caveB);
  }

  return caveMap;
}

function findPaths(
  cave: string,
  path: string[],
  paths: string[][],
  caveMap: Record<string, string[]>,
) {
  let nextPath = [...path, cave];

  if (cave === "end") {
    paths.push(nextPath);
    return;
  }

  caveMap[cave].forEach((c) => {
    if (isLowercase(c) && path.includes(c)) {
      return;
    }
    findPaths(c, nextPath, paths, caveMap);
  });
}

function part1(rawInput: string): number {
  let caveMap = parseInput(rawInput);

  let paths: string[][] = [];
  findPaths("start", [], paths, caveMap);

  return paths.length;
}

function findPathsWithRevisit(
  cave: string,
  path: string[],
  flag: boolean,
  paths: string[][],
  caveMap: Record<string, string[]>,
) {
  let nextPath = [...path, cave];

  if (cave === "end") {
    paths.push(nextPath);
    return;
  }

  caveMap[cave].forEach((c) => {
    if (c === "start") {
      return;
    }

    let nextFlag = flag;
    if (isLowercase(c)) {
      if (path.includes(c)) {
        if (nextFlag) {
          return;
        }
        nextFlag = true;
      }
    }

    findPathsWithRevisit(c, nextPath, nextFlag, paths, caveMap);
  });
}

function part2(rawInput: string): number {
  let caveMap = parseInput(rawInput);

  let paths: string[][] = [];
  findPathsWithRevisit("start", [], false, paths, caveMap);

  return paths.length;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_12_test.txt";
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
