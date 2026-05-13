/**
 * Formats a number using es-ES locale (thousands separator: dot, decimal: comma).
 * Fixed format regardless of the user's browser/OS locale.
 * Examples: 1924593 → "1.924.593"
 */
export const formatNumber = (value: number): string =>
  value.toLocaleString("es-ES");
