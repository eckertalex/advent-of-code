internal String8 str8(u8 *str, u64 size) {
    return (String8){.str = str, .size = size};
}

internal String8 read_file(char *path) {
    FILE *file = fopen(path, "rb");
    if (file == nullptr) {
        return (String8){0};
    }

    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    rewind(file);

    u8 *data = malloc((u64)size);
    u64 read = fread(data, 1, (u64)size, file);
    fclose(file);
    return str8(data, read);
}

internal bool str8_next_line(String8 *rest, String8 *line) {
    if (rest->size == 0) {
        return false;
    }

    u64 length = 0;
    while (length < rest->size && rest->str[length] != '\n') {
        length += 1;
    }
    *line = str8(rest->str, length);

    u64 skip = length < rest->size ? length + 1 : length;
    rest->str += skip;
    rest->size -= skip;
    return true;
}

internal i64 i64_from_str8(String8 s) {
    u64 i = 0;
    i64 sign = 1;
    if (i < s.size && s.str[i] == '-') {
        sign = -1;
        i += 1;
    }

    i64 result = 0;
    while (i < s.size && s.str[i] >= '0' && s.str[i] <= '9') {
        result = result * 10 + (s.str[i] - '0');
        i += 1;
    }
    return sign * result;
}
