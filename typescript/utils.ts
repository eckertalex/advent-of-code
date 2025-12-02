export function sum(numbers: number[]) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function prod(numbers: number[]) {
  return numbers.reduce((sum, number) => sum * number, 1);
}

export function mean(nums: number[]) {
  return sum(nums) / nums.length;
}

export function median(nums: number[]) {
  let sorted = nums.slice().sort((a, b) => a - b);
  let middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

export function createMatrix(size: number) {
  return [...new Array<number>(size)].map(() =>
    new Array<number>(size).fill(0),
  );
}

export function transpose2DMatrix(matrix: any[][]) {
  return matrix[0].map((_, i) => matrix.map((x) => x[i]));
}

export function flipBits(bits: string) {
  return bits
    .split("")
    .map((bit) => (bit === "1" ? "0" : "1"))
    .join("");
}

export function neighbors(
  y: number,
  x: number,
  grid: any[][],
): [number, number][] {
  const result: [number, number][] = [];
  for (let dy of [-1, 0, 1]) {
    for (let dx of [-1, 0, 1]) {
      if (dy === 0 && dx === 0) {
        continue;
      }
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        result.push([ny, nx]);
      }
    }
  }
  return result;
}
