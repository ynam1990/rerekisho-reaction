import { useEffect, useRef, useState } from "react";

export const useElementRect = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [elHeight, setElHeight] = useState(0);
  const [elWidth, setElWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setElHeight(entry.borderBoxSize?.[0]?.blockSize);
      setElWidth(entry.borderBoxSize?.[0]?.inlineSize);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, elHeight, elWidth };
};
