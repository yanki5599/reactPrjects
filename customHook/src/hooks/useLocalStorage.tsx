import { useEffect, useState } from "react";

function getFromLocalStorage<T>(key: string): T | undefined {
  try {
    const data = localStorage.getItem(key);
    const json: T = JSON.parse(data || "");
    return json;
  } catch (err: any) {
    console.error(`Error reading ${key} from localStorage:`, err);

    return undefined;
  }
}
function saveToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function useLocalStorage<T>(defaultState: T, key: string) {
  const [state, setState] = useState<T>(
    getFromLocalStorage<T>(key) || defaultState
  );

  useEffect(() => {
    saveToLocalStorage<T>(key, state);
  }, [state]);

  return { state, setState };
}

export default useLocalStorage;
