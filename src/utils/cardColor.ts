/**
 * Matrix of available colors, useful to fill the credit card
 */
const availableColors: string[][] = [
  ['#fd696b', '#fa616e', '#f65871', '#f15075'],
  ['#4b8512', '#1d960e', '#1fb52d', '#006902'],
  ['#1a23fd', '#3e49fa', '#56a6f6', '#21b2f1'],
  ['#df19fd', '#fa48d7', '#f666e1', '#e151f1'],
  ['#fd7f15', '#fa954d', '#f6b57a', '#f1bd26'],
  ['#b49820', '#fab53b', '#f6b672', '#f1d645'],
  ['#fd696b', '#fa616e', '#f65871', '#f15075'],
  ['#fd696b', '#fa616e', '#f65871', '#f15075'],
  ['#fd696b', '#fa616e', '#f65871', '#f15075']
];

/**
 * Utils if you iterate an array, you can call this function directly with the index of the item
 */
export function colorCardGenerator(): (value: number) => string[] {
  return (value: number) => getColorCard(value % availableColors.length);
}

/**
 * Get the row of the availableColor matrix
 */
export function getColorCard(index: number): string[] {
  return availableColors[index];
}
