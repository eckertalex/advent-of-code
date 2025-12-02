import { readFileSync } from "node:fs";
import { argv } from "node:process";

function part1(rawInput: string): number {
  let digits = rawInput
    .split("\n")
    .flatMap((line) => line.split("|")[1].trim().split(" "));

  let count = 0;
  for (let digit of digits) {
    if ([2, 3, 4, 7].some((d) => digit.length === d)) {
      count++;
    }
  }

  return count;
}

function hasLength(value: number): (signal: string) => boolean {
  return (signal: string): boolean => signal.length === value;
}

function part2(rawInput: string): number {
  let lines = rawInput.split("\n").map((line) => {
    let [uniqueSignals, output] = line
      .split("|")
      .map((e) => e.trim().split(" "));

    return {
      uniqueSignals,
      output: output.map((signal) => signal.split("").sort().join("")),
    };
  });

  let sumOfOutput = 0;
  for (let { uniqueSignals, output } of lines) {
    let one = uniqueSignals.find(hasLength(2))?.split("");
    let four = uniqueSignals.find(hasLength(4))?.split("");
    let seven = uniqueSignals.find(hasLength(3))?.split("");
    let eight = uniqueSignals.find(hasLength(7))?.split("");

    let twoOrThreeOrFive = uniqueSignals
      .filter(hasLength(5))
      .map((signal) => signal.split(""));
    let zeroOrSixOrNine = uniqueSignals
      .filter(hasLength(6))
      .map((signal) => signal.split(""));

    let topLeftOrMiddle = four?.filter((signal) => !one?.includes(signal));

    let three = twoOrThreeOrFive.find((signal) =>
      one?.every((segment) => signal.includes(segment)),
    );
    let twoOrFive = twoOrThreeOrFive.filter((signal) => signal !== three);

    let topLeft = topLeftOrMiddle?.find((segment) => !three?.includes(segment));
    let middle = topLeftOrMiddle?.find((segment) => segment !== topLeft);

    let zero = zeroOrSixOrNine?.find(
      (signal) => middle && !signal.includes(middle),
    );
    let sixOrNine = zeroOrSixOrNine?.filter((signal) => signal !== zero);

    let nine = sixOrNine.find((signal) =>
      one?.every((segment) => signal.includes(segment)),
    );
    let six = sixOrNine.find((signal) => signal !== nine);

    let two = twoOrFive.find((signal) => topLeft && !signal.includes(topLeft));
    let five = twoOrFive.find((signal) => signal !== two);

    let digits = new Map([
      [zero?.sort().join(""), "0"],
      [one?.sort().join(""), "1"],
      [two?.sort().join(""), "2"],
      [three?.sort().join(""), "3"],
      [four?.sort().join(""), "4"],
      [five?.sort().join(""), "5"],
      [six?.sort().join(""), "6"],
      [seven?.sort().join(""), "7"],
      [eight?.sort().join(""), "8"],
      [nine?.sort().join(""), "9"],
    ]);

    let value = +output.map((signal) => digits.get(signal)).join("");

    sumOfOutput += value;
  }

  return sumOfOutput;
}

function main() {
  try {
    const filePath = argv.length >= 3 ? argv[2] : "../data/2021_08_test.txt";
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
