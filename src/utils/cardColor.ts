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

export function colorCardGenerator(): (value: number) => string[] {
  return (value: number) => availableColors[value % availableColors.length];
}

export function getColorCard(index: number): string[] {
  return availableColors[index];
}
