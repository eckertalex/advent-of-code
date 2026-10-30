//go:build ignore

package main

import (
	"fmt"
	"os"
	"strconv"

	"aoc/go/util"
)

func parseMeasurements(lines []string) []int {
	measurements := make([]int, 0, len(lines))
	for _, line := range lines {
		n, err := strconv.Atoi(line)
		if err != nil {
			fmt.Println("Error parsing number:", line)
			continue
		}
		measurements = append(measurements, n)
	}
	return measurements
}

func part1(measurements []int) int {
	count := 0
	for i := 1; i < len(measurements); i++ {
		if measurements[i] > measurements[i-1] {
			count++
		}
	}
	return count
}

func part2(measurements []int) int {
	count := 0
	prevSum := measurements[0] + measurements[1] + measurements[2]
	for i := 3; i < len(measurements); i++ {
		sum := measurements[i] + measurements[i-1] + measurements[i-2]
		if sum > prevSum {
			count++
		}
		prevSum = sum
	}
	return count
}

func main() {
	filePath := "data/2021-01-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	measurements := parseMeasurements(util.ReadLines(filePath))

	fmt.Println("P1:", part1(measurements))
	fmt.Println("P2:", part2(measurements))
}
