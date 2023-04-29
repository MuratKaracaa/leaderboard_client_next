import localStorageKeys, { LocalStorageKeysType } from "../localStorageKeys";

export const getFromStore = <T>(key: LocalStorageKeysType): T => {
  const fromStore = localStorage.getItem(localStorageKeys[key]);
  if (fromStore) {
    return JSON.parse(fromStore) as T;
  } else {
    return null as T;
  }
};

export const saveToStore = <T>(key: LocalStorageKeysType, data: T) => {
  localStorage.setItem(localStorageKeys[key], JSON.stringify(data));
};

export const deleteFromStore = (key: LocalStorageKeysType) => {
  localStorage.removeItem(localStorageKeys[key]);
};
