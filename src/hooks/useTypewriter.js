import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text, options = {}) => {
  const {
    typeMs = 280,
    deleteMs = 200,
    pauseStartMs = 500,
    pauseEndMs = 1200,
    loop = true
  } = options;

  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef(null);
  const isDeletingRef = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayText(text);
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Reset state
    setDisplayText('');
    indexRef.current = 0;
    isDeletingRef.current = false;

    const tick = () => {
      if (isDeletingRef.current) {
        indexRef.current = Math.max(0, indexRef.current - 1);
        setDisplayText(text.slice(0, indexRef.current));
        
        if (indexRef.current === 0) {
          isDeletingRef.current = false;
          timeoutRef.current = setTimeout(tick, pauseStartMs);
          return;
        }
        
        timeoutRef.current = setTimeout(tick, deleteMs);
        return;
      }

      indexRef.current = Math.min(text.length, indexRef.current + 1);
      setDisplayText(text.slice(0, indexRef.current));
      
      if (indexRef.current === text.length) {
        if (loop) {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(tick, pauseEndMs);
        }
        return;
      }
      
      timeoutRef.current = setTimeout(tick, typeMs);
    };

    // Start the animation after a delay
    timeoutRef.current = setTimeout(tick, pauseStartMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, typeMs, deleteMs, pauseStartMs, pauseEndMs, loop]);

  return displayText;
};
