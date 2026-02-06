import { useEffect, useState } from "react";

export const useScrollbarRect = () => {
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const dummy = document.createElement('div');
      dummy.style.visibility = 'hidden';
      dummy.style.overflow = 'scroll';
      dummy.style.width = '100px';
      dummy.style.height = '100px';
      document.body.appendChild(dummy);

      const innerDummy = document.createElement('div');
      innerDummy.style.width = '100%';
      innerDummy.style.height = '100%';
      dummy.appendChild(innerDummy);

      const width = dummy.offsetWidth - innerDummy.offsetWidth;
      const height = dummy.offsetHeight - innerDummy.offsetHeight;
      dummy.remove();

      setScrollbarHeight(height);
      setScrollbarWidth(width);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { scrollbarHeight, scrollbarWidth };
};
