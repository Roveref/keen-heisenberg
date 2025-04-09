// src/components/Challenge/Timer.js
import React, { useState, useEffect, useRef } from "react";

const Timer = ({ duration, onTimeEnd, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          onTimeEnd && onTimeEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, onTimeEnd, isPaused]);

  // Reset timer if duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate percentage for progress bar
  const progressPercentage = (timeLeft / duration) * 100;

  // Determine color based on time left
  const getColor = () => {
    if (timeLeft < duration * 0.2) return "bg-red-500";
    if (timeLeft < duration * 0.5) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-full h-2 bg-indigo-900 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${getColor()} transition-all duration-1000`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div
        className={`font-mono text-lg ${
          timeLeft < duration * 0.2 ? "text-red-500" : "text-white"
        }`}
      >
        {formatTime()}
      </div>
    </div>
  );
};

export default Timer;
