import Keyv from 'keyv';

const keyv = new Keyv();

export const set = (key, value, ttl = 0) => keyv.set(key, value, ttl);

export const get = (key) => keyv.get(key);

export const del = (key) => keyv.delete(key);