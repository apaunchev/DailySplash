import { useEffect } from "react";

const useInterval = (callback, interval = 1000) => {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, interval);

    return () => {
      clearInterval(id);
    };
  }, [callback, interval]);
};

export default useInterval;
