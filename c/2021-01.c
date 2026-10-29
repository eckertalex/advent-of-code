#include "base/base_inc.h"
#include "base/base_inc.c"

internal i64 part1(i32 *measurements, u64 count) {
    i64 increases = 0;
    for (u64 i = 1; i < count; i += 1) {
        if (measurements[i] > measurements[i - 1]) {
            increases += 1;
        }
    }

    return increases;
}

internal i64 part2(i32 *measurements, u64 count) {
    i64 increases = 0;
    i32 prev_sum = measurements[0] + measurements[1] + measurements[2];
    for (u64 i = 3; i < count; i += 1) {
        i32 sum = measurements[i] + measurements[i - 1] + measurements[i - 2];
        if (sum > prev_sum) {
            increases += 1;
        }
        prev_sum = sum;
    }

    return increases;
}

int main(int argc, char *argv[]) {
    char *file_path = (argc > 1) ? argv[1] : "../data/2021-01-test.txt";

    String8 input = read_file(file_path);
    if (input.str == nullptr) {
        fprintf(stderr, "Failed to open file\n");
        return 1;
    }

    // One number per line: count the lines, then parse them
    u64 count = 0;
    String8 rest = input;
    String8 line;
    while (str8_next_line(&rest, &line)) {
        count += 1;
    }

    i32 *measurements = malloc(count * sizeof *measurements);
    rest = input;
    for (u64 i = 0; str8_next_line(&rest, &line); i += 1) {
        measurements[i] = (i32)i64_from_str8(line);
    }

    printf("P1: %" PRId64 "\n", part1(measurements, count));
    printf("P2: %" PRId64 "\n", part2(measurements, count));

    return 0;
}
