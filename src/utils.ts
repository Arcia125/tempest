import { Remapped } from './types';

export function mapBy<T extends {}>(arr: Array<T>, key: keyof T): Remapped<T> {
  return arr.reduce((acc, curr) => {
    const newKey = curr[key];
    if (!(typeof newKey == 'number' || typeof newKey === 'string'))
      throw new Error(`Invalid key ${newKey} found on object ${JSON.stringify(curr)} using key ${key}`);

    acc[newKey] = curr;

    return acc;
  }, {} as Remapped<T>);
}
