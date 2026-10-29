#!/bin/sh
set -eu

# Relative input paths are relative to where the script was called from
caller="$PWD"
cd "$(dirname "$0")"

# --- Arguments ---------------------------------------------------------------
langs=""
day=""
input=""

while [ "$#" -gt 0 ]; do
    case "$1" in
        c|ts|go) langs="$langs $1" ;;
        [0-9][0-9][0-9][0-9]-[0-9][0-9]) day="$1" ;;
        *)
            # Anything else is the puzzle input. Days run from their own
            # folder, so it's made absolute
            case "$1" in
                /*) path="$1" ;;
                *) path="$caller/$1" ;;
            esac
            if [ -n "$day" ] && [ -z "$input" ] && [ -f "$path" ]; then
                input="$path"
            elif [ -n "$day" ] && [ -z "$input" ]; then
                echo "error: no input file $1" >&2
                exit 2
            else
                echo "usage: $0 [c|ts|go...] [YYYY-DD [input]]" >&2
                exit 2
            fi
            ;;
    esac
    shift
done

langs="${langs:-c ts go}"

# --- Languages ---------------------------------------------------------------
# Each language lives in its own folder (c/, ts/, go/) with one file per day.
# A day runs, in every language that has it. Without a day, every C and Go
# day is built and every TypeScript day checked, so the editor sees errors.
# Days run from their folder, so the default ../data inputs resolve, and the
# Entering line tells editors that errors are relative to it

# C compiles, so c/build.sh does the work
build_c() {
    c/build.sh ${day:+"$day"} ${input:+"$input"}
}

# TypeScript runs from source, so without a day it only checks the syntax
build_ts() (
    cd ts
    echo "build: Entering directory '$PWD'" >&2
    rc=0
    for file in ${day:-[0-9]*}.ts; do
        if [ -n "$day" ]; then
            node "$file" ${input:+"$input"} || rc=1
        else
            node --check "$file" || rc=1
        fi
    done
    exit "$rc"
)

# Go builds each day into go/build/, one at a time since each is its own
# program. From inside go/, so imports of the aoc module (aoc/util) resolve
build_go() (
    cd go
    echo "build: Entering directory '$PWD'" >&2
    mkdir -p build
    rc=0
    for file in ${day:-[0-9]*}.go; do
        go build -o "build/${file%.go}" "$file" || rc=1
    done
    if [ -n "$day" ] && [ "$rc" -eq 0 ]; then
        exec ./build/"$day" ${input:+"$input"}
    fi
    exit "$rc"
)

# --- Build -------------------------------------------------------------------
status=0
found=""
for lang in $langs; do
    if [ -n "$day" ] && [ ! -f "$lang/$day.$lang" ]; then
        continue
    fi
    found="yes"
    echo "=== $lang ===" >&2
    build_$lang || status=1
    echo >&2
done

if [ -z "$found" ]; then
    echo "error: no $day in:$(for lang in $langs; do printf ' %s/%s.%s' "$lang" "$day" "$lang"; done)" >&2
    exit 2
fi

exit "$status"
