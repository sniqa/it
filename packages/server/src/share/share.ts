export const isObject = (data: any) => typeof data === "object";

export const isArray = (data: any) => Array.isArray(data);

export const hasKeys = (data: any, ...keys: string[]) => {
  return isObject(data) && keys.every((key) => Reflect.has(data, key));
};

import path from 'path'
import { fileURLToPath } from 'url'

// ES module __dirname
const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)