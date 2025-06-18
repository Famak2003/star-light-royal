import { useEffect } from "react";
interface props {
    ref: React.RefObject<HTMLElement | null>,
    btnRef?: React.RefObject<HTMLElement | null>,
    callback: (event: MouseEvent | TouchEvent) => void
}

export const useOutsideClick = ({ref, btnRef, callback} : props) => {
    useEffect(() => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node) || !btnRef?.current || btnRef?.current.contains(event.target as Node) ) {
          return;
        }
        callback(event);
      };
   
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
   
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, callback]);
  };
  