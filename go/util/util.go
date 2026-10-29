package util

import (
	"fmt"
	"os"
	"strings"
)

// ReadLines reads a file into its lines and exits if it can't
func ReadLines(filePath string) []string {
	data, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	return strings.Split(strings.TrimRight(string(data), "\n"), "\n")
}

func RuneMatrix(lines []string) [][]rune {
	var matrix [][]rune
	for _, line := range lines {
		matrix = append(matrix, []rune(line))
	}
	return matrix
}
