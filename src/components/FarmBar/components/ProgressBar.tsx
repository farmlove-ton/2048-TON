import React from "react";
import { Caption } from "../../Text";

interface ProgressBarProps {
  totalTime: number; // total time in seconds
  timeLeft: number; // initial time left in seconds
  onClick: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalTime,
  timeLeft,
  onClick,
}) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div
      className="w-full rounded-xl h-10"
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

      <div
        className="absolute flex items-center backdrop-blur-xl w-fit px-4 py-2.5 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-nowrap"
        style={{ left: `${progress}%` }}
        onClick={onClick}
      >
        Take now
      </div>

      <div className="absolute right-4 -top-5">
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
