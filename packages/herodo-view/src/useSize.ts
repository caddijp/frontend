import { RefObject, useEffect, useState } from 'react';

export const useSize = (
  src: string,
  containerRef: RefObject<HTMLElement>
): { width: number; height: number; naturalWidth: number; naturalHeight: number } => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [naturalWidth, setNaturalWidth] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(1);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setNaturalWidth(img.naturalWidth);
      setNaturalHeight(img.naturalHeight);
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    let timeoutId = 0;
    const onResize = () => {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        if (!containerRef.current) return;

        setWidth(containerRef.current.clientWidth);
        setHeight(containerRef.current.clientHeight);
      }, 100);
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return { width, height, naturalWidth, naturalHeight };
};
