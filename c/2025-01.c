#include <stdio.h>
#include <stdlib.h>

int part1(FILE* file) {

    int dial = 50;
    int count = 0;
    char buffer[6];
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

    return count;
}


int part2(FILE* file) {

    int dial = 50;
    int count = 0;
    char buffer[6];
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

    return count;
}

int main(int argc, char *argv[]) {
    char* file_path = (argc > 1) ? argv[1] : "../data/2025-01-test.txt";

    FILE* file = fopen(file_path, "r");

    if(!file) {
        fprintf(stderr, "Failed to open file\n");
        return 1;
    }

    int solution1 = part1(file);
    rewind(file);
    int solution2 = part2(file);
    fclose(file);

    printf("P1: %d\n", solution1);
    printf("P2: %d\n", solution2);

    return 0;
}
