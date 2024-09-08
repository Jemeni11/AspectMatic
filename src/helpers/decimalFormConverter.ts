export default function decimalFormConverter(
  a: number,
  b: number,
  shouldRound: boolean = false,
): number {
  return +(a / b).toFixed(shouldRound ? 0 : 10);
}
