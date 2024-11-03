import React, { useEffect, useRef } from "react";
import "./Timer.css";

interface TimerProps {
  startTime: number; // in ms
  running: boolean;
}

const Timer: React.FC<TimerProps> = ({ startTime, running }) => {
  const timerId = useRef(null);

  function clacMinutesAndSeconds(milliseconds: number): {
    minutes: number;
    seconds: number;
  } {
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);

    return { minutes, seconds };
  }

  function formatTime(): string {
    const { minutes, seconds } = clacMinutesAndSeconds(startTime);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return <div className="Timer">{formatTime()}</div>;
};

export default Timer;
