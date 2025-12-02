#include <stdio.h>
#include <stdlib.h>

int part1(char* file_path) {
    FILE* file = fopen(file_path, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    int dial = 50;
    int count = 0;
    char buffer[8];

    while (fgets(buffer, sizeof buffer, file)) {
        char direction = buffer[0];
        buffer[0] = '+';
        int clicks = atoi(buffer);

        if (direction == 'R') {
            dial += clicks;
        }
        if (direction == 'L') {
            dial -= clicks;
        }

        dial %= 100;
        if(dial < 0) {
            dial += 100;
        }

        if (dial == 0) {
            count++;
        }
    }

    fclose(file);

    return count;
}


int part2(char* file_path) {
    FILE* file = fopen(file_path, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    int dial = 50;
    int count = 0;
    char buffer[8];

    while (fgets(buffer, sizeof buffer, file)) {
        char direction = buffer[0];
        buffer[0] = '+';
        int clicks = atoi(buffer);

        int tmp_dial = dial;
        if (direction == 'R') {
            tmp_dial += clicks;
        }
        if (direction == 'L') {
            tmp_dial -= clicks;
        }

        if (dial && tmp_dial <= 0) {
            count++;
        }

        if(tmp_dial < 0) {
            count += -tmp_dial / 100;
            dial = 100 - (-tmp_dial % 100);
        } else {
            count += tmp_dial / 100;
            dial = tmp_dial % 100;
        }

        if (dial == 100) {
            dial = 0;
        }
    }

    fclose(file);

    return count;
}

int main(int argc, char *argv[]) {
    char* file_path = (argc > 1) ? argv[1] : "../data/2025_01_test.txt";

    int solution1 = part1(file_path);
    int solution2 = part2(file_path);

    printf("P1: %d\n", solution1);
    printf("P2: %d\n", solution2);

    return 0;
}
