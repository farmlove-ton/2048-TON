import React, { useEffect, useState } from "react";
import { Caption } from "./Text";
import Logo from "./Logo";

interface ProgressBarProps {
  totalTime: number; // total time in seconds
  initialTimeLeft: number; // initial time left in seconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalTime,
  initialTimeLeft,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((totalTime - timeLeft) / totalTime) * 100);
  }, [timeLeft, totalTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full rounded-xl h-10"
      style={{
        background: "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
      }}
    >
      <div
        className="h-10 rounded-xl bg-gradient-pink"
        style={{
          width: `${progress}%`,
        }}
      ></div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Logo width={64} height={16} />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Caption className="text-[#FFFFFF99]">
          {Math.floor(timeLeft / 3600)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor((timeLeft % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :{(timeLeft % 60).toString().padStart(2, "0")}
        </Caption>
      </div>
    </div>
  );
};

export default ProgressBar;
