import { useEffect, useState } from "react";
import Button from "../Button";
import ProgressBar from "./components/ProgressBar";
import { Subtitle } from "../Text";

interface IProps {
  onFarm: () => void;
  farmCounter: number;
  farmedAmount: number;
  maxCounter: number;
  updatedUserTicketsAmount: number;
  timeToFull: number;
}

export default function FarmBar({
  onFarm,
  farmCounter,
  maxCounter,
  timeToFull,
}: IProps) {
  const percentageComplete = farmCounter / maxCounter;
  const elapsedTime = timeToFull * percentageComplete;
  const initialTimeLeft = Math.ceil(timeToFull - elapsedTime);

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

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

  if (!timeLeft) {
    return (
      <Button className="w-full" color="pink">
        Get Reward
      </Button>
    );
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Subtitle>{farmCounter} points</Subtitle>
      </div>
      <ProgressBar
        timeLeft={timeLeft}
        totalTime={timeToFull}
        onClick={onFarm}
      />
    </div>
  );
}
