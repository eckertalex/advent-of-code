# 🎄 Advent of Code 🌟

This repository contains my solutions to [Advent of Code](https://adventofcode.com/) challenges.

| Year | Language(s) | ⭐️ |
| ---- | ----------- | --- |
| 2021 | TypeScript  | 28  |
| 2024 | Go          | 14  |
| 2025 | C           | 4   |

## Build

Every day is one file per language: `c/YYYY-DD.c`, `ts/YYYY-DD.ts` or `go/YYYY-DD.go`.
`build.sh` runs a day in every language that has it, or only the ones you name first.

```sh
./build.sh 2025-01                  # run the day in every language that has it
./build.sh go 2025-01               # only Go
./build.sh c go 2025-01             # only C and Go
./build.sh 2024-01 data/2024-01.txt # with your real input
./build.sh                          # no day: build every C day, check every TypeScript day
```

This repo is for getting answers, so there are no release builds. C and Go days
compile into `c/build/` and `go/build/` and run from there. TypeScript days run
straight from source with `node`, so without a day they're only checked
(`node --check`).

Each day reads `data/YYYY-DD-test.txt` by default. Real inputs go next to them as
`data/YYYY-DD.txt` and are gitignored.

To start a day, copy the language's template and replace `YYYY-DD` in its input path:

```sh
cp go/template.go go/2025-04.go     # also c/template.c, ts/template.ts
```

Go days start with `//go:build ignore`, so each file stays its own program.
Shared code goes in the base layer for C (`c/base/`: `i32`, `String8`, reading
input line by line), a module for TypeScript (`ts/utils.ts`) and the `aoc/util`
package for Go (`go/util/`).
