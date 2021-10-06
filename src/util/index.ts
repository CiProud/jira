import { useEffect, useState } from "react";

// 处理0
export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(
  array: T[]
): [T[], () => void, (arg0: number) => void, (arg0: T) => void] => {
  const [value, setValue] = useState(array);
  const clear = () => setValue([]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    setValue(copy.splice(index, 1));
  };
  const add = (item: T) => {
    setValue([...value, item]);
  };
  return [value, clear, removeIndex, add];
};
