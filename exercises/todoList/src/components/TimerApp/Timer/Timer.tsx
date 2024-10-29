import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [isStop, setIsStop] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isStop) setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isStop]);

  return (
    <>
      <h1>{time}</h1>
      <button onClick={() => setIsStop((prev) => !prev)}>
        {isStop ? "▶️" : "⏸️"}
      </button>
    </>
  );
};

export default Timer;
