import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(
 callback: T,
 delay: number = 500
): T {
 const timeoutRef = useRef<NodeJS.Timeout>();

 const debouncedCallback = useCallback(
  (...args: Parameters<T>) => {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
   }

   timeoutRef.current = setTimeout(() => {
    callback(...args);
   }, delay);
  },
  [callback, delay]
 ) as T;

 return debouncedCallback;
}

export default useDebounce;
