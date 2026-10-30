#ifndef BASE_STRING_H
#define BASE_STRING_H

// A view into bytes, not null terminated
typedef struct String8 {
    u8 *str;
    u64 size;
} String8;

#define str8_lit(s) ((String8){(u8 *)(s), sizeof(s) - 1})

internal String8 str8(u8 *str, u64 size);

// The whole file, or a null str on failure
internal String8 read_file(char *path);

// Next line of rest, without the newline. False when rest is empty
internal bool str8_next_line(String8 *rest, String8 *line);

// An optional '-' and digits, stopping at anything else
internal i64 i64_from_str8(String8 s);

#endif // BASE_STRING_H
