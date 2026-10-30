#!/bin/sh
# usage: ./watch.sh [c|go|ts...] YYYY-DD [input]
# Real inputs are gitignored, so watch ignored files too
exec watchexec --restart --clear --no-vcs-ignore --shell=none \
    --watch c --watch go --watch ts --watch data \
    --exts c,h,go,ts,txt \
    --ignore '**/build/**' --ignore '**/node_modules/**' \
    -- ./run.sh "$@"
