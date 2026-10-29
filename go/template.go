//go:build ignore

package main

import (
	"fmt"
	"os"

	"aoc/util"
)

func part1(lines []string) int {
	return 0
}

func part2(lines []string) int {
	return 0
}

func main() {
	filePath := "../data/YYYY-DD-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
