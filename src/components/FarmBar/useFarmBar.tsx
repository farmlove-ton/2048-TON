import { useEffect, useState } from "react";

interface IProps {
  farmCounter: number;
  maxCounter: number;
  timeToFull: number;
}

export const useFarmBar = ({ farmCounter, maxCounter, timeToFull }: IProps) => {
  const percentageComplete = farmCounter / maxCounter;
  const elapsedTime = timeToFull * percentageComplete;
  const initialTimeLeft = Math.ceil(timeToFull - elapsedTime);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  const progress = Math.ceil(((timeToFull - timeLeft) / timeToFull) * 100);

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

  return {
    progress,
    timeLeft: {
      hours: Math.floor(timeLeft / 3600)
        .toString()
        .padStart(2, "0"),
      minutes: Math.floor((timeLeft % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      seconds: (timeLeft % 60).toString().padStart(2, "0"),
    },
  };
};
