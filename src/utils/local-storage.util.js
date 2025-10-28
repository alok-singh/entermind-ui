import { parseJson } from "./parse.util";

export const getLocalStorageItem = (key) => {
  const result = parseJson(localStorage.getItem(key));
  if (result) {
    const { value, ttl } = result;
    if (ttl > Date.now()) {
      return parseJson(value);
    }

    localStorage.removeItem(key);
  }
};

/**
 * @param {*} key 
 * @param {*} value 
 * @param {*} ttl in Seconds
 * @returns 
 */
export const setLocalStorageItem = (key, value, ttl) => {
  const expiryTime = ttl ? new Date(new Date().getTime() + (ttl * 1000)).getTime() : ttl;
  const stringToStore = JSON.stringify({ value, ttl: expiryTime });
  return localStorage.setItem(key, stringToStore);
};

export const clearLocalStorage = () => localStorage.clear();