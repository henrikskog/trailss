import React from "react";

/**
 * Wrapper hook for requestAnimationFrame 
 * @param callback Function to run
 * @param fps Number of calls to function per second
 */
export const useAnimationFrame = (
  callback: (time: number) => void,
  fps: number
) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number>(0);

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;

    setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, 1000 / fps);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};
