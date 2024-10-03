import { useEffect, useState } from "react";

interface IProps {
  lastFarmTimestamp: string | null;
  maxTimeSeconds: number;
  maxPoints: number;
}

function formatDateString(dateString: string) {
  // Normalize timezone format by inserting a colon if necessary
  return dateString
    .replace(/([+-]\d{2})(\d{2})$/, "$1:$2") // Insert a colon in the timezone part
    .replace(" ", "T")
    .replace(" ", "");
}

const getInitialRemainingTimeAndPercentage = (
  lastFarmTimestamp: string | null,
  maxTimeSeconds: number
) => {
  if (!lastFarmTimestamp) {
    return { initialRemainingTime: 0, percentage: 1 };
  }

  const now = new Date();

  const diffSeconds =
    (now.getTime() - new Date(formatDateString(lastFarmTimestamp)).getTime()) /
    1000;

  return {
    percentage: Math.min(diffSeconds / maxTimeSeconds, 1),
    initialRemainingTime: Math.floor(Math.max(maxTimeSeconds - diffSeconds, 0)),
  };
};

export const useFarmBar = ({
  lastFarmTimestamp,
  maxTimeSeconds,
  maxPoints,
}: IProps) => {
  const { initialRemainingTime, percentage } =
    getInitialRemainingTimeAndPercentage(lastFarmTimestamp, maxTimeSeconds);

  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTimeLeft) => {
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
    setRemainingTime(initialRemainingTime);
  }, [initialRemainingTime]);

  // Calculate current love points based on percentage
  const currentPoints = Math.min(Math.floor(percentage * maxPoints), maxPoints);

  return {
    progress: Math.floor(percentage * 100) / 100,
    timeLeft: {
      hours: Math.floor(remainingTime / 3600)
        .toString()
        .padStart(2, "0"),
      minutes: Math.floor((remainingTime % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      seconds: (remainingTime % 60).toString().padStart(2, "0"),
    },
    currentPoints,
  };
};
