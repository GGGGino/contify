const availableColors: string[][] = [
  ['#fd696b', '#fa616e', '#f65871', '#f15075'],
  ['#84fd29', '#bbfa5e', '#d8f67b', '#b8f133'],
  ['#1a23fd', '#3e49fa', '#56a6f6', '#21b2f1'],
  ['#df19fd', '#fa48d7', '#f666e1', '#e151f1'],
  ['#fd7f15', '#fa954d', '#f6b57a', '#f1bd26'],
  ['#fd696b', '#fa616e', '#f65871', '#f15075'],
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
