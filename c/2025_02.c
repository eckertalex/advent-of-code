#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

int is_invalid_id1(long id) {
    char s[32];
    sprintf(s, "%ld", id);
    int len = strlen(s);

    if(len % 2 != 0) {
        return 0;
    }

    int mid = len / 2;

    for(int i = 0; i < mid; i++) {
        if(s[i] != s[mid + i]) {
            return 0;
        }
    }

    return 1;
}

int is_invalid_id2(long id) {
    char s[32];
    sprintf(s, "%ld", id);
    int len = strlen(s);

    for(int pattern_len = 1; pattern_len <= len/2; pattern_len++) {
        if(len % pattern_len != 0) {
            continue;
        }

        if(len/pattern_len < 2) {
            continue;
        }

        int is_pattern = 1;
        for(int i = pattern_len; i < len; i++) {
            if(s[i] != s[i % pattern_len]) {
                is_pattern = 0;
                break;
            }
        }

        if(is_pattern) {
            return 1;
        }
    }

    return 0;
}

long part1(char* input) {
    long total = 0;

    char *range = strtok(input, ",");
    while (range) {
        long min, max;
        sscanf(range, "%ld-%ld", &min, &max);

        for(long i = min; i <= max; i++) {
            if(is_invalid_id1(i)) {
                total += i;
            }
        }

        range = strtok(NULL, ",");
    }

    return total;
}

long part2(char* input) {
    long total = 0;

    char *range = strtok(input, ",");
    while (range) {
        long min, max;
        sscanf(range, "%ld-%ld", &min, &max);

        for(long i = min; i <= max; i++) {
            if(is_invalid_id2(i)) {
                total += i;
            }
        }

        range = strtok(NULL, ",");
    }

    return total;
}

int main(int argc, char *argv[]) {
    char* file_path = (argc > 1) ? argv[1] : "../data/2025_02_test.txt";

    FILE* file = fopen(file_path, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    char buffer[1024];
    if (!fgets(buffer, sizeof buffer, file)) {
        printf("Failed to read from file.\n");
        fclose(file);
        return 1;
    }
    fclose(file);

    char buffer_copy[1024];
    strcpy(buffer_copy, buffer);

    long solution1 = part1(buffer);
    long solution2 = part2(buffer_copy);

    printf("P1: %ld\n", solution1);
    printf("P2: %ld\n", solution2);

    return 0;
}
