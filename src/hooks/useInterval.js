import { useEffect } from "react";

export default (callback, interval = 1000) => {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, interval);

    return () => {
      clearInterval(id);
    };
  }, []);
};
