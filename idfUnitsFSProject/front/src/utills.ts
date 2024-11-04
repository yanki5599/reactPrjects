export function objectMap<T>(obj: object, fn: (a: T) => any);
Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
