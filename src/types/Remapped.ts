export type Remapped<T extends {}> = {
  [K in string | number]: T;
};
