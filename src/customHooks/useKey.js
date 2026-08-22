import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          callback();
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return function () {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [key, callback],
  );
}
