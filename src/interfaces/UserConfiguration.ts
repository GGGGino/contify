export interface UserConfiguration {
  name: string;
  alreadyPutted: number;
  maxToPut: number|null;
  toPut?: number;
}
