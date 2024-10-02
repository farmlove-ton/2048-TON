import { HeartGradientIcon } from "../icons/HeartGradientIcon";
import { BodyText, Title } from "../Text";
import { useFarmBar } from "./useFarmBar";

interface IProps {
  onFarm: () => void;
  lastFarmTimestamp: string | null;
  maxTimeSeconds: number;
  maxPoints: number;
}

export default function FarmBar({
  onFarm,
  lastFarmTimestamp,
  maxTimeSeconds,
  maxPoints,
}: IProps) {
  const { progress, timeLeft, currentPoints } = useFarmBar({
    lastFarmTimestamp,
    maxTimeSeconds,
    maxPoints,
  });

  return (
    <div className="relative" onClick={onFarm}>
      <HeartGradientIcon
        className="w-[241px] cursor-pointer"
        progress={progress}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <Title className="text-4xl font-extrabold">{currentPoints}</Title>
        <BodyText>
          {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </BodyText>
      </div>
    </div>
  );
}
