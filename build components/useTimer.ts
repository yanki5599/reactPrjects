import { useEffect, useRef, useState } from "react";

const useTimer = () => {
  const [value, setValue] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (isRunning) setValue((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  return { value, isRunning, setIsRunning };
};

export default useTimer;
