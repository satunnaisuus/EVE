import { useState, useCallback, useEffect } from "react";

export default function useSize(): [number, number, (node: HTMLElement) => void] {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [unobserve, setUnobserve] = useState<() => any>();

  const ref = useCallback((node: HTMLElement) => {
    if (node) {
      setWidth(node.getBoundingClientRect().width);
      setHeight(node.getBoundingClientRect().height);

      const resizeObserver = new ResizeObserver((entries) => {
        for(let entry of entries){
          setWidth(entry.contentRect.width);
          setHeight(entry.contentRect.height);
          break;
        }
      });

      resizeObserver.observe(node);
      setUnobserve(() => () => resizeObserver.disconnect());
    }
  }, []);

  useEffect(() => unobserve, [unobserve]);

  return [width, height, ref];
}