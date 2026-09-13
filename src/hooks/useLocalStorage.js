// @react
import { useEffect, useState } from 'react';

/***************************  HOOKS - LOCAL STORAGE  ***************************/

/**
 * Reads localStorage *after* hydration rather than during the first render.
 *
 * The server has no localStorage, so it always renders with `defaultValue`. By
 * starting the client from that same value the first client render matches the
 * server markup exactly, which is what allows the app to be server-rendered at
 * all. The stored value is applied straight after mount.
 */
export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  // Apply the persisted value once the client has hydrated
  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return;

    try {
      // Merge so config fields added after a visitor's value was stored keep their default
      setValue({ ...defaultValue, ...JSON.parse(storedValue) });
    } catch {
      localStorage.removeItem(key);
    }
  }, [key, defaultValue]);

  // Keep other tabs in sync
  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? { ...defaultValue, ...JSON.parse(e.newValue) } : defaultValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
