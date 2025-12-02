import { readFileSync } from "node:fs";
import { argv } from "node:process";
import { flipBits } from "./utils.ts";

function getGammaRate(lines: string[]) {
  let gammaRate = "";
  let length = lines[0].length;

  for (let i = 0; i < length; i++) {
    let zeros = 0;
    let ones = 0;

    for (let line of lines) {
      if (line[i] === "1") {
        ones += 1;
      } else {
        zeros += 1;
      }
    }

    gammaRate += zeros > ones ? "0" : "1";
    zeros = 0;
    ones = 0;
  }

  return gammaRate;
}

function getOxygenGeneratorRating(lines: string[]) {
  let length = lines[0].length;

  for (let i = 0; i < length; i++) {
    let zeros = 0;
    let ones = 0;

    lines = lines.filter(Boolean);
    if (lines.length === 1) {
      break;
    }

    lines.forEach((line) => {
      if (line[i] === "1") {
        ones += 1;
      } else {
        zeros += 1;
      }
    });

    if (ones >= zeros) {
      lines.forEach((line, idx) => {
        if (line[i] === "0") {
          delete lines[idx];
        }
      });
    } else {
      lines.forEach((line, idx) => {
        if (line[i] === "1") {
          delete lines[idx];
        }
      });
    }

    zeros = 0;
    ones = 0;
  }

  return lines.filter(Boolean)[0];
}

function getCo2ScrubberRating(lines: string[]) {
  let length = lines[0].length;

  for (let i = 0; i < length; i++) {
    let zeros = 0;
    let ones = 0;

    lines = lines.filter(Boolean);
    if (lines.length === 1) {
      break;
    }

    lines.forEach((line) => {
      if (line[i] === "1") {
        ones += 1;
      } else {
        zeros += 1;
      }
    });

    if (ones >= zeros) {
      lines.forEach((line, idx) => {
        if (line[i] === "1") {
          delete lines[idx];
        }
      });
    } else {
      lines.forEach((line, idx) => {
        if (line[i] === "0") {
          delete lines[idx];
        }
      });
    }

    zeros = 0;
    ones = 0;
  }

  return lines.filter(Boolean)[0];
}

function part1(rawInput: string): number {
  const input = rawInput.split("\n");

  let gammaRate = getGammaRate(input);
  let epsilonRate = flipBits(gammaRate);

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function part2(rawInput: string): number {
  const input = rawInput.split("\n");
  let oxygenGeneratorRating = getOxygenGeneratorRating([...input]);
  let co2ScrubberRating = getCo2ScrubberRating([...input]);

  return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_03_test.txt";
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
