# Advent of Code in Go 🌟🎄

Each year, day, and part can be run directly from the command line using the provided `aoc` script.

## 🎄 Features 🌟

- **Run with CLI Arguments**: Easily specify the year, day, and part of the Advent of Code puzzle to solve.
- **Defaults**: If no arguments are given:
  - Defaults to the current year
  - Defaults to today's date in December (or `1` if not in December).
  - Defaults to part `1`.

## 🚀 Usage

### Run the App

Simply run the `aoc` script with the desired arguments. Example:

```bash
./aoc run --year 2024 --day 1 --part 1
```

### Arguments:

- `--year <year>`: Specify the year for the Advent of Code puzzle.
- `--day <day>`: Specify the day of the puzzle.
- `--part <part>`: Specify the part of the puzzle to solve (1 or 2).

### Defaults:

- If no arguments are provided, the script will default to:
  - The current year
  - The current day in December (or day 1 if not in December).
  - Part 1.
