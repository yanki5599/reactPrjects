export function readFromLocalStorage<T>(key: string): undefined | T {
  const item: string | null = localStorage.getItem(key);
  if (!item) return undefined;
  const object: T = JSON.parse(item);
  return object;
}
