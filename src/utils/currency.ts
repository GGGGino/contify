/**
 * From the numeric value passed as 2300 it returns 23.00 €.
 * Other examples:
 * 1000 -> 10.00 €
 * 500  ->  5.00 €
 * 2345 -> 23.45 €
 */
export function intToCurrString(value: number): string {
  return `${(value / 100).toFixed(2)} €`;
}
