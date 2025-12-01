#!/usr/bin/env bash

# Exit on any error
set -e

if [ -f main ]; then
    rm main
fi

gcc -o main $1

shift

./main "$@"
