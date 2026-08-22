import { useState , useEffect } from "react";

export function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(function () {
    const storedWatched = localStorage.getItem(key);
    return storedWatched ? JSON.parse(storedWatched) : initialValue;
  });
useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value));
},[value , setValue , key])

  return [value, setValue];
}
