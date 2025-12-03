#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

long part1(const char* file_path) {
    FILE* file = fopen(file_path, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    long total = 0;
    char buffer[1024];
    while (fgets(buffer, sizeof buffer, file)) {
        buffer[strcspn(buffer, "\n")] = '\0';
        size_t len = strlen(buffer);

        char first_max = '0';
        size_t first_idx = 0;
        for (size_t i = 0; i < len-1; i++) {
            char c = buffer[i];
            if(first_max < c) {
                first_max = c;
                first_idx = i;
            }
        }

        char second_max = '0';
        for (size_t i = first_idx+1; i < len; i++) {
            char c = buffer[i];
            if(second_max < c) {
                second_max = c;
            }
        }

        char maxes[3] = {first_max, second_max, '\0'};
        total += atol(maxes);
    }

    fclose(file);

    return total;
}

long part2(const char* file_path) {
    FILE* file = fopen(file_path, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    long total = 0;
    char buffer[1024];
    while (fgets(buffer, sizeof buffer, file)) {
        buffer[strcspn(buffer, "\n")] = '\0';
        size_t len = strlen(buffer);

        char maxes[13] = {0};
        size_t start_idx = 0;
        for (size_t m = 0; m < 12 && start_idx < len; m++) {
            char max_char = buffer[start_idx];
            size_t max_idx = start_idx;

            size_t remaining_needed = 12 - (m + 1);
            size_t search_limit = len;

            if (remaining_needed < len) {
                search_limit = len - remaining_needed;
            }

            if (search_limit <= start_idx) {
                search_limit = len;
            }

            for (size_t i = start_idx; i < search_limit; i++) {
                char c = buffer[i];
                if(c > max_char) {
                    max_char = c;
                    max_idx = i;
                }

            }

            maxes[m] = max_char;
            start_idx = max_idx + 1;
        }

        maxes[12] = '\0';
        printf("---\n");
        printf("total: %ld\n", total);
        printf("line:  %s\n", buffer);
        printf("maxes: %s\n", maxes);
        printf("---\n");
        total += atol(maxes);
    }

    fclose(file);

    return total;
}

int main(int argc, char *argv[]) {
    char* file_path = (argc > 1) ? argv[1] : "../data/2025_03_test.txt";

    long solution1 = part1(file_path);
    long solution2 = part2(file_path);

    printf("P1: %ld\n", solution1);
    printf("P2: %ld\n", solution2);

    return 0;
}
