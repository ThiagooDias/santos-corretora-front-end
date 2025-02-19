import { useState, useRef, useLayoutEffect } from "react";

export const useWindowWidth = () => {
  const widthRef = useRef(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (widthRef.current !== window.innerWidth) {
        widthRef.current = window.innerWidth;
        setWidth(window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};