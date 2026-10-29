#!/bin/sh
set -eu

cd "$(dirname "$0")"

# --- Arguments ---------------------------------------------------------------
compiler="clang"
day=""

while [ "$#" -gt 0 ]; do
    case "$1" in
        clang|gcc|cc) compiler="$1" ;;
        [0-9][0-9][0-9][0-9]-[0-9][0-9])
            # The rest of the arguments go to the day, e.g. its input file
            day="$1"
            shift
            break
            ;;
        *)
            echo "usage: $0 [clang|gcc|cc] [YYYY-DD [args...]]" >&2
            exit 2
            ;;
    esac
    shift
done

# --- Flags -------------------------------------------------------------------
# Always a debug build: the puzzles don't need optimized builds
cc_cflags_gcc=""
cc_cflags_clang="-fdiagnostics-absolute-paths"
cc_flags="-std=c23 -O0 -g -Wall -Wextra -Wpedantic -Wno-unused-function"

# --- Choose Flags ------------------------------------------------------------
if   [ "$compiler" = "gcc" ];   then compile="${CC:-gcc} $cc_cflags_gcc $cc_flags"
elif [ "$compiler" = "clang" ]; then compile="${CC:-clang} $cc_cflags_clang $cc_flags"
elif [ "$compiler" = "cc" ];    then compile="${CC:-cc} $cc_flags"
fi

# --- Build -------------------------------------------------------------------
# Without a day, build every day
mkdir -p build
for each in ${day:-$(ls [0-9]*.c | sed 's/\.c$//')}; do
    $compile "$each.c" -o "build/$each"
done

# --- Run ---------------------------------------------------------------------
# A day runs from c/, so its default input path (../data/...) resolves
if [ -n "$day" ]; then
    exec ./build/"$day" "$@"
fi
