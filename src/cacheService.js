// src/cacheService.js
const cache = new Map();

export const getCache = () => {
  return {
    get: async (key) => {
      return cache.get(key);
    },
    set: async (key, value, _, expirationTime) => {
      cache.set(key, value);
      setTimeout(() => {
        cache.delete(key);
      }, expirationTime * 1000);
    },
  };
};