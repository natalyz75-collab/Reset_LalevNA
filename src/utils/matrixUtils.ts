/**
 * Reduces a number to the range 1-22 according to Matrix of Destiny rules.
 * If the number is greater than 22, its digits are summed.
 */
export function reduceTo22(num: number): number {
  if (num <= 22) return num === 0 ? 22 : num;
  
  let sum = 0;
  let temp = num;
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }
  
  return reduceTo22(sum);
}

export interface MatrixData {
  day: number;
  month: number;
  year: number;
  a: number; // Left
  b: number; // Top
  c: number; // Right
  d: number; // Bottom
  e: number; // Center
}

export function calculateMatrix(dateStr: string): MatrixData | null {
  // Expected format: DD/MM/YYYY
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  const a = reduceTo22(day);
  const b = reduceTo22(month);
  
  // Year reduction: sum of digits
  let yearSum = 0;
  let tempYear = year;
  while (tempYear > 0) {
    yearSum += tempYear % 10;
    tempYear = Math.floor(tempYear / 10);
  }
  const c = reduceTo22(yearSum);
  
  const d = reduceTo22(a + b + c);
  const e = reduceTo22(a + b + c + d);

  return { day, month, year, a, b, c, d, e };
}
