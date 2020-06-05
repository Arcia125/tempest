export const createClassNameGenerator = (baseName: string) => (
  className?: string,
  ...addedNames: string[]
) => `${baseName} ${baseName}-${addedNames.join(` ${baseName}-`)} ${className}`;
