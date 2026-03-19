import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function useIndexedDB<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    get(key).then((val) => {
      if (val !== undefined) {
        setStoredValue(val);
      } else {
        // Try to migrate from localStorage
        try {
          const item = window.localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            setStoredValue(parsed);
            set(key, parsed).catch(console.error);
          }
        } catch (error) {
          console.error('Error migrating from localStorage', error);
        }
      }
      setIsLoaded(true);
    }).catch((err) => {
      console.error('Error reading from IndexedDB', err);
      setIsLoaded(true);
    });
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      set(key, valueToStore).catch((err) => {
        console.error('Error saving to IndexedDB', err);
      });
    } catch (error) {
      console.error('Error saving to IndexedDB', error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}
