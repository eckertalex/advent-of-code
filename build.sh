#!/bin/sh
# usage: ./build.sh [YYYY-DD]
# Builds C. Go and TypeScript run from source, see run.sh
# Run from the repo root, so errors point at c/YYYY-DD.c for :make
set -eu

case "${1:-}" in
    ""|[0-9][0-9][0-9][0-9]-[0-9][0-9]) ;;
    *)
        echo "usage: $0 [YYYY-DD]" >&2
        exit 2
        ;;
esac

mkdir -p c/build
status=0
for file in c/${1:-[0-9]*}.c; do
    [ -f "$file" ] || continue
    ${CC:-clang} -std=c23 -O0 -g -Wall -Wextra -Wpedantic -Wshadow -Wconversion -Wundef -Wno-unused-function \
        "$file" -o "c/build/$(basename "$file" .c)" || status=1
done

exit "$status"
