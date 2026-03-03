import React, { useEffect, useState } from "react";

type TimerProps = {
  duration: number; 
  onTimeUp: () => void;
  keyProp: number; 
  running: boolean; 
  currentQuestion: number; 
  totalQuestions: number; 
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onTimeUp,
  keyProp,
  running,
  currentQuestion,
  totalQuestions,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when  question change
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, keyProp]);

  // Timer countdown
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, onTimeUp]);

  const timePercentage = (timeLeft / duration) * 100;
  const questionPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-md mb-4">
      {/* Timer display */}
      <div className="flex justify-between mb-1 text-sm font-semibold">
        <span>Time Left:</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="w-full h-2 bg-gray-300 rounded mb-3">
        <div
          className="h-2 rounded bg-red-500 transition-all duration-300"
          style={{ width: `${timePercentage}%` }}
        />
      </div>

      {/* Quiz Progress Bar */}
      <div className="flex justify-between mb-1 text-sm font-semibold">
        <span>Question:</span>
        <span>
          {currentQuestion + 1} / {totalQuestions}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-300 rounded">
        <div
          className="h-2 rounded bg-blue-500 transition-all duration-300"
          style={{ width: `${questionPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;