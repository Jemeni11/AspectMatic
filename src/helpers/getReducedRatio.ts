/**
 * Calculates the reduced ratio of two numbers.
 * @param a - The first number
 * @param b - The second number
 * @returns The reduced ratio as an array of two integers
 */
export default function getReducedRatio(
  a: number,
  b: number
): [number, number] {
  // Handle negative numbers
  a = Math.abs(a);
  b = Math.abs(b);

  // Base case: if one of the numbers is 0, return [1, 1]
  if (a === 0) return [1, 1];
  if (b === 0) return [1, 1];

  // Recursive case: gcd(a, b) = gcd(b, a % b)
  const remainder = a - Math.floor(a / b) * b;
  const reducedRatio = getReducedRatio(b, remainder);

  // Reduce the ratio using the GCD
  const divider = reducedRatio[0] * b + reducedRatio[1] * a;
  const reducedA = Math.floor(a / divider);
  const reducedB = Math.floor(b / divider);

  return [reducedA, reducedB];
}
