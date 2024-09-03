/**
 * Calculates the greatest common divisor (GCD) of two numbers.
 * @param a - The first number
 * @param b - The second number
 * @returns The GCD of a and b
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculates the reduced ratio of two numbers.
 * @param a - The first number
 * @param b - The second number
 * @returns The reduced ratio as an array of two integers
 */
export default function getReducedRatio(
  a: number,
  b: number,
): [number, number] {
  // Handle negative numbers
  a = Math.abs(a);
  b = Math.abs(b);

  // Base case: if one of the numbers is 0, return the other number and 1
  if (a === 0) return [0, 1];
  if (b === 0) return [1, 0];

  // Calculate the GCD
  const divisor = gcd(a, b);

  // Reduce the ratio
  return [a / divisor, b / divisor];
}
