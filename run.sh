#!/bin/sh
# usage: ./run.sh [c|go|ts...] YYYY-DD [input]
set -eu

langs=""
day=""
input=""
for arg; do
    case "$arg" in
        c|go|ts) langs="$langs $arg" ;;
        [0-9][0-9][0-9][0-9]-[0-9][0-9]) day="$arg" ;;
        *) input="$arg" ;;
    esac
done

if [ -z "$day" ]; then
    echo "usage: $0 [c|go|ts...] YYYY-DD [input]" >&2
    exit 2
fi
langs="${langs:-c go ts}"

status=0
found=""
for lang in $langs; do
    [ -f "$lang/$day.$lang" ] || continue
    found="yes"
    echo "=== $lang ===" >&2
    case "$lang" in
        c) ./build.sh "$day" && "c/build/$day" ${input:+"$input"} ;;
        go) go run "go/$day.go" ${input:+"$input"} ;;
        ts) node "ts/$day.ts" ${input:+"$input"} ;;
    esac || status=1
done

if [ -z "$found" ]; then
    echo "error: no $day in" $langs >&2
    exit 2
fi

exit "$status"
