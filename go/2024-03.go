//go:build ignore

package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"

	"aoc/go/util"
)

func mulitply(text string) int {
	r := regexp.MustCompile(`\d{1,3}`)
	matches := r.FindAllString(text, 2)
	x, err := strconv.Atoi(matches[0])
	if err != nil {
		fmt.Println(err)
	}
	y, err := strconv.Atoi(matches[1])
	if err != nil {
		fmt.Println(err)
	}
	return x * y
}

func part1(lines []string) string {
	r := regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)`)
	matches := r.FindAllString(strings.Join(lines, "\n"), -1)
	sum := 0
	for _, match := range matches {
		product := mulitply(match)
		sum += product
	}
	return strconv.Itoa(sum)
}

func part2(lines []string) string {
	r := regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)`)
	matches := r.FindAllString(strings.Join(lines, "\n"), -1)
	sum := 0
	do := true
	for _, match := range matches {
		if match[0:3] == "mul" && do {
			product := mulitply(match)
			sum += product
		} else {
			do = match == "do()"
		}
	}
	return strconv.Itoa(sum)
}

func main() {
	filePath := "data/2024-03-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
