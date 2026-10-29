//go:build ignore

package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"

	"aoc/util"
)

func splitRulesUpdates(lines []string) ([][]string, [][]string) {
	var rules [][]string
	var updates [][]string
	foundLineBreak := false
	for _, line := range lines {
		switch {
		case line == "":
			foundLineBreak = true
		case !foundLineBreak:
			rule := strings.Split(line, "|")
			rules = append(rules, rule)
		case foundLineBreak:
			pages := strings.Split(line, ",")
			updates = append(updates, pages)
		}
	}
	return rules, updates
}

func sortByRules(rules [][]string) func(a, b string) int {
	return func(a, b string) int {
		for _, rule := range rules {
			if rule[0] == a && rule[1] == b {
				return -1
			}
		}
		return 0
	}
}

func part1(lines []string) string {
	rules, updates := splitRulesUpdates(lines)
	midSum := 0
	for _, update := range updates {
		correctlySorted := slices.IsSortedFunc(update, sortByRules(rules))
		if correctlySorted {
			mid := update[len(update)/2]
			n, err := strconv.Atoi(mid)
			if err != nil {
				fmt.Println(err)
				continue
			}
			midSum += n
		}
	}
	return strconv.Itoa(midSum)
}

func part2(lines []string) string {
	rules, updates := splitRulesUpdates(lines)
	midSum := 0
	for _, update := range updates {
		correctlySorted := slices.IsSortedFunc(update, sortByRules(rules))
		if !correctlySorted {
			slices.SortFunc(update, sortByRules(rules))
			mid := update[len(update)/2]
			n, err := strconv.Atoi(mid)
			if err != nil {
				fmt.Println(err)
				continue
			}
			midSum += n
		}
	}
	return strconv.Itoa(midSum)
}

func main() {
	filePath := "../data/2024-05-test.txt"
	if len(os.Args) > 1 {
		filePath = os.Args[1]
	}
	lines := util.ReadLines(filePath)

	fmt.Println("P1:", part1(lines))
	fmt.Println("P2:", part2(lines))
}
