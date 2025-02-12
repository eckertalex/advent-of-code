package cmd

import (
	"fmt"
	"time"

	"github.com/eckertalex/aoc-in-go/internal/2024/day01"
	"github.com/eckertalex/aoc-in-go/internal/2024/day02"
	"github.com/eckertalex/aoc-in-go/internal/2024/day03"
	"github.com/eckertalex/aoc-in-go/internal/2024/day04"
	"github.com/eckertalex/aoc-in-go/internal/2024/day05"
	"github.com/eckertalex/aoc-in-go/internal/2024/day06"
	"github.com/eckertalex/aoc-in-go/internal/2024/day07"
	input "github.com/eckertalex/aoc-in-go/internal/input"
	"github.com/eckertalex/aoc-in-go/internal/util"
	"github.com/spf13/cobra"
)

type Solution interface {
	Part1(input *input.Input) string
	Part2(input *input.Input) string
}

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Run a specific Advent of Code challenge",
	Run: func(_ *cobra.Command, _ []string) {
		err := runChallenge()
		cobra.CheckErr(err)
	},
}

func runChallenge() error {
	solution, err := loadSolution(year, day)
	if err != nil {
		return fmt.Errorf("failed to load solution: %v", err)
	}

	inputData, err := input.FromFile(year, day)
	if err != nil {
		return fmt.Errorf("failed to load input: %v", err)
	}

	var result string
	var startTime time.Time
	switch part {
	case 1:
		startTime = time.Now()
		result = solution.Part1(inputData)
	case 2:
		startTime = time.Now()
		result = solution.Part2(inputData)
	default:
		return fmt.Errorf("invalid part number: %d (must be 1 or 2)", part)
	}
	elapsedTime := time.Since(startTime)

	fmt.Printf("%s in %v\n", result, elapsedTime)

	err = util.CopyToClipboard(result)
	return err
}

func loadSolution(year, day int) (Solution, error) {
	switch year {
	case 2024:
		switch day {
		case 1:
			return day01.New(), nil
		case 2:
			return day02.New(), nil
		case 3:
			return day03.New(), nil
		case 4:
			return day04.New(), nil
		case 5:
			return day05.New(), nil
		case 6:
			return day06.New(), nil
		case 7:
			return day07.New(), nil
		default:
			return nil, fmt.Errorf("no solution found for year %d, day %d", year, day)
		}
	default:
		return nil, fmt.Errorf("no solutions found for year %d", year)
	}
}
