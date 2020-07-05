export function leftPad(val: string | number, pad: string, length: number) {
  const discrepancy = length - val.toString().length;
  return `${discrepancy > 0 ? pad.repeat(discrepancy) : ''}${val}`;
}
