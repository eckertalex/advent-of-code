#ifndef BASE_CORE_H
#define BASE_CORE_H

#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define internal static
#define global static
#define local_persist static

typedef uint8_t u8;
typedef uint16_t u16;
typedef uint32_t u32;
typedef uint64_t u64;

typedef int8_t i8;
typedef int16_t i16;
typedef int32_t i32;
typedef int64_t i64;

typedef float f32;
typedef double f64;

#define ArrayCount(a) (sizeof(a) / sizeof((a)[0]))
#define Min(a, b) ((a) < (b) ? (a) : (b))
#define Max(a, b) ((a) > (b) ? (a) : (b))

#define MemoryCopy(dst, src, size) memmove((dst), (src), (size))
#define MemorySet(dst, byte, size) memset((dst), (byte), (size))
#define MemoryZero(dst, size) memset((dst), 0, (size))

#define Trap() __builtin_trap()

// Days are always debug builds, so asserts are always on
#define Assert(x)                                                              \
    do {                                                                       \
        if (!(x)) {                                                            \
            Trap();                                                            \
        }                                                                      \
    } while (0)

#endif // BASE_CORE_H
