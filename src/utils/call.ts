export function call<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> {
  return fn(...args);
}
