import {  useRef } from "react";
import { useKey } from "../customHooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("enter", () => {
    if (document.activeElement === inputEl.current) return;

    setQuery("");
    inputEl.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
