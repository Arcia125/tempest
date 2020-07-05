export function classNames(...classes: Array<string | undefined>) {
  return classes.filter(v => !!v).join(' ');
}
