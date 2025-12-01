#include <stdio.h>
#include <stdlib.h>

int part1(char* filename) {
    FILE* file = fopen(filename, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    int dial = 50;
    int count = 0;
    char buffer[8];

    while (fgets(buffer, sizeof buffer, file)) {
        char dir = buffer[0];
        buffer[0] = '+';
        int clicks = atoi(buffer);

        if (dir == 'R') {
            dial += clicks;
        }
        if (dir == 'L') {
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


int part2(char* filename) {
    FILE* file = fopen(filename, "r");

    if(!file) {
        printf("Failed to open file\n");
        return 1;
    }

    int dial = 50;
    int count = 0;
    char buffer[8];

    while (fgets(buffer, sizeof buffer, file)) {
        char dir = buffer[0];
        buffer[0] = '+';
        int clicks = atoi(buffer);

        int tmpDial = dial;
        if (dir == 'R') {
            tmpDial += clicks;
        }
        if (dir == 'L') {
            tmpDial -= clicks;
        }

        if (dial && tmpDial <= 0) {
            count++;
        }

        if(tmpDial < 0) {
            count += -tmpDial / 100;
            dial = 100 - (-tmpDial % 100);
        } else {
            count += tmpDial / 100;
            dial = tmpDial % 100;
        }

        if (dial == 100) {
            dial = 0;
        }
    }

    fclose(file);

    return count;
}

int main(int argc, char *argv[]) {
    char* filename = (argc > 1) ? argv[1] : "2025_01_test.txt";

    int solution1 = part1(filename);
    int solution2 = part2(filename);

    printf("P1: %d\n", solution1);
    printf("P2: %d\n", solution2);

    return 0;
}
