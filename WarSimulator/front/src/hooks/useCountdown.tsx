import { useEffect, useRef, useState } from "react";

const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  const timer = useRef<number>();

  useEffect(() => {
    if (countDown > 1) {
      timer.current = setInterval(() => {
        const n = countDownDate - new Date().getTime();
        setCountDown(n > 0 ? n : 0);
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [countDown]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
