//go:build ignore

package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"

	"aoc/go/util"
)

func splitLinesToInt2D(lines []string) [][]int {
	var int2D [][]int
	for _, line := range lines {
		fields := strings.Fields(line)
		row := make([]int, len(fields))
		for i, field := range fields {
			n, err := strconv.Atoi(field)
			if err != nil {
				fmt.Println("Error parsing numbers on line:", line)
				continue
			}
			row[i] = n
		}
		int2D = append(int2D, row)
	}
	return int2D
}

func isSafeReport(report []int) bool {
	isInc, isDec := true, true
	for i := 1; i < len(report); i++ {
		diff := report[i] - report[i-1]
		if math.Abs(float64(diff)) > 3 {
			return false
		}
		if diff > 0 {
			isDec = false
		} else if diff < 0 {
			isInc = false
		} else {
			isInc, isDec = false, false
		}
	}
	return isInc || isDec
}

func remove(slice []int, index int) []int {
	cs := make([]int, len(slice))
	copy(cs, slice)
	return append(cs[:index], cs[index+1:]...)
}

func part1(lines []string) string {
	reports := splitLinesToInt2D(lines)
	safeCount := 0
	for _, report := range reports {
		if isSafeReport(report) {
			safeCount++
		}
	}
	return strconv.Itoa(safeCount)
}

func part2(lines []string) string {
	reports := splitLinesToInt2D(lines)
	safeCount := 0
	for _, report := range reports {
		if isSafeReport(report) {
			safeCount++
			continue
		}
		for i := range report {
			rs := remove(report, i)
			if isSafeReport(rs) {
				safeCount++
				break
			}
		}
	}
	return strconv.Itoa(safeCount)
}

func main() {
	filePath := "data/2024-02-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
