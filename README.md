# 🎄 Advent of Code 🌟

This repository contains my solutions to [Advent of Code](https://adventofcode.com/) challenges.

## Build

One file per day and language: `c/YYYY-DD.c`, `go/YYYY-DD.go`, `ts/YYYY-DD.ts`.
Run everything from the repo root. Languages are optional, all of them by default.

```sh
./build.sh                           # build every C day
./build.sh 2025-01                   # build one C day
./run.sh 2025-01                     # build and run it
./run.sh go 2024-01 data/2024-01.txt # only Go, real input
./watch.sh 2025-01                   # run again on every save
```

`watch.sh` needs [watchexec](https://github.com/watchexec/watchexec).

Days read `data/YYYY-DD-test.txt` by default. Real inputs go in
`data/YYYY-DD.txt`, which is gitignored.

New day: copy `c/template.c`, `ts/template.ts` or `go/template.go` and replace
`YYYY-DD`. Shared code goes in `c/base/`, `ts/utils.ts` or `go/util/`.
