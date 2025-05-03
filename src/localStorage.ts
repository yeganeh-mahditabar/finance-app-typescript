export const LOCAL_STORAGE_KEY = "transactions";

export function setData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  export function getData<T>(key: string): T | null {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  }
  