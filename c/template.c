#include "base/base_inc.h"
#include "base/base_inc.c"

internal i64 part1(String8 input) {
    String8 line;
    while (str8_next_line(&input, &line)) {
    }

    return 0;
}

internal i64 part2(String8 input) {
    String8 line;
    while (str8_next_line(&input, &line)) {
    }

    return 0;
}

int main(int argc, char *argv[]) {
    char *file_path = (argc > 1) ? argv[1] : "data/YYYY-DD-test.txt";

    String8 input = read_file(file_path);
    if (input.str == nullptr) {
        fprintf(stderr, "Failed to open file\n");
        return 1;
    }

    printf("P1: %" PRId64 "\n", part1(input));
    printf("P2: %" PRId64 "\n", part2(input));

    return 0;
}
