#!/usr/bin/env bash

set -e

if [ -f main ]; then
    rm main
fi

gcc -o main $1

shift

./main "$@"
