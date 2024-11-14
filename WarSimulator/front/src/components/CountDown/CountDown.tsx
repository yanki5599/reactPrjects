import React from "react";
import "./CountDown.css";
import { useCountdown } from "../../hooks/useCountdown";

interface CountDownProps {
  targetDate: Date;
}

const CountDown: React.FC<CountDownProps> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <>
      {days + hours + minutes + seconds > 0
        ? `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        : " - "}
    </>
  );
};

export default CountDown;
