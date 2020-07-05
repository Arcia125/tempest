import { Remapped } from '../types';

export function mapBy<T extends {}>(arr: Array<T>, key: keyof T): Remapped<T> {
  return arr.reduce((acc, curr) => {
    const newKey = curr[key];
    if (!(typeof newKey == 'number' || typeof newKey === 'string'))
      throw new Error(`Invalid key ${newKey} found on object ${JSON.stringify(curr)} using key ${key}`);

    acc[newKey] = curr;

    return acc;
  }, {} as Remapped<T>);
}

export function leftPad(val: string | number, pad: string, length: number) {
  const discrepancy = length - val.toString().length;
  return `${discrepancy > 0 ? pad.repeat(discrepancy) : ''}${val}`;
}

export function classNames(...classes: Array<string | undefined>) {
  return classes.filter(v => !!v).join(' ');
}

export { createClassNameGenerator } from './createClassNameGenerator';
