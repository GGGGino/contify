import {useEffect} from "react";

export default function (callback: () => any, deps: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay]);
}
