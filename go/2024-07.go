//go:build ignore

package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"aoc/go/util"
)

type Equation struct {
	Target  int
	Numbers []int
}

func parseEquations(lines []string) []Equation {
	var equations []Equation
	for _, line := range lines {
		before, after, found := strings.Cut(line, ":")
		if !found {
			fmt.Println("could not find \":\"", line)
			continue
		}
		test, err := strconv.Atoi(before)
		if err != nil {
			fmt.Println("could not parse test", line, before)
		}
		var nums []int
		for _, str := range strings.Split(strings.TrimSpace(after), " ") {
			num, err := strconv.Atoi(str)
			if err != nil {
				fmt.Println("could not parse num", after, num)
			}
			nums = append(nums, num)
		}
		equations = append(equations, Equation{test, nums})
	}
	return equations
}

func validEq(target int, nums []int, concat bool) bool {
	if len(nums) < 2 {
		return nums[0] == target
	}
	var backtrack func(pos, cur int) bool
	backtrack = func(pos, cur int) bool {
		if pos == len(nums) {
			return cur == target
		}
		if backtrack(pos+1, cur+nums[pos]) {
			return true
		}
		if backtrack(pos+1, cur*nums[pos]) {
			return true
		}
		if concat {
			concatStr := fmt.Sprintf("%d%d", cur, nums[pos])
			concatNum, err := strconv.Atoi(concatStr)
			if err != nil {
				fmt.Println("could not parse test", concatStr)
				return false
			}
			if backtrack(pos+1, concatNum) {
				return true
			}
		}
		return false
	}
	return backtrack(1, nums[0])
}

func part1(lines []string) string {
	eqs := parseEquations(lines)
	sum := 0
	for _, eq := range eqs {
		if validEq(eq.Target, eq.Numbers, false) {
			sum += eq.Target
		}
	}
	return strconv.Itoa(sum)
}

func part2(lines []string) string {
	eqs := parseEquations(lines)
	sum := 0
	for _, eq := range eqs {
		if validEq(eq.Target, eq.Numbers, true) {
			sum += eq.Target
		}
	}
	return strconv.Itoa(sum)
}

func main() {
	filePath := "data/2024-07-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
