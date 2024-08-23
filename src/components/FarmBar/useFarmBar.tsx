import { useEffect, useState } from "react";

interface IProps {
  farmCounter: number;
  maxCounter: number;
  initialTimeLeft: number;
}

export const useFarmBar = ({
  farmCounter,
  maxCounter,
  initialTimeLeft,
}: IProps) => {
  const percentageComplete = farmCounter / maxCounter;
  const timeToFull = Math.ceil(initialTimeLeft / (1 - percentageComplete));
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

  useEffect(() => {
    setTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

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
