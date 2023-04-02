import React, { useState, useRef, useEffect } from "react";

function useDebounce<T>(
  callback: () => void,
  delay: number,
  dependencyList: T[]
) {
  const [isReady, setIsReady] = useState(false);

  const idRef = useRef();

  useEffect(() => {
    if (isReady) {
      setIsReady(!isReady);
    }

    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      callback();
      setIsReady(true);
    }, delay);
    console.log(handler);
    idRef.current = handler;
    console.log(idRef);
    return () => {
      console.log("clearing inside useEfect");
      clearTimeout(handler);
    };
  }, dependencyList);

  const cancel = () => clearTimeout(idRef.current);

  return { isReady, cancel };
}

export default useDebounce;
