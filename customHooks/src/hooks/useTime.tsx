import { useEffect, useRef, useState } from "react";

function formattedTime(date: Date): string {
  const hoursString = date.getHours().toString().padStart(2, "0");
  const minString = date.getMinutes().toString().padStart(2, "0");
  const secString = date.getSeconds().toString().padStart(2, "0");

  return `${hoursString}:${minString}:${secString}`;
}

function useTime() {
  const [time, setTime] = useState<Date>(new Date());

  const timer = useRef<number>();

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  return { time: formattedTime(time) };
}

export default useTime;
