//go:build ignore

package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"

	"aoc/util"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func sum(slice []int) int {
	total := 0
	for _, value := range slice {
		total += value
	}
	return total
}

func splitLines(lines []string) ([]int, []int) {
	var ls, rs []int
	for _, line := range lines {
		fields := strings.Fields(line)
		if len(fields) != 2 {
			fmt.Println("Invalid line format:", line)
			continue
		}

		l, errl := strconv.Atoi(fields[0])
		r, errr := strconv.Atoi(fields[1])
		if errl != nil || errr != nil {
			fmt.Println("Error parsing numbers on line:", line)
			continue
		}

		ls = append(ls, l)
		rs = append(rs, r)
	}

	return ls, rs
}

func part1(lines []string) string {
	ls, rs := splitLines(lines)

	sort.Ints(ls)
	sort.Ints(rs)

	length := min(len(ls), len(rs))
	xs := make([]int, length)
	for i := range length {
		xs[i] = abs(ls[i] - rs[i])
	}

	return strconv.Itoa(sum(xs))
}

func part2(lines []string) string {
	ls, rs := splitLines(lines)

	var xs []int
	for _, l := range ls {
		count := 0
		for _, r := range rs {
			if l == r {
				count++
			}
		}
		xs = append(xs, l*count)
	}

	return strconv.Itoa(sum(xs))
}

func main() {
	filePath := "../data/2024-01-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
