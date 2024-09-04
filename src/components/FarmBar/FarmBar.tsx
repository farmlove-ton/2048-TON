import Button from "../Button";
import { BodyText } from "../Text";
import ProgressBar from "./components/ProgressBar";
import { useFarmBar } from "./useFarmBar";

interface IProps {
  onFarm: () => void;
  lastFarmTimestamp: string | null;
  maxTimeSeconds: number;
}

export default function FarmBar({
  onFarm,
  lastFarmTimestamp,
  maxTimeSeconds,
}: IProps) {
  const { progress, timeLeft } = useFarmBar({
    lastFarmTimestamp,
    maxTimeSeconds,
  });

  return (
    <div className="flex flex-col items-end space-y-1">
      <div className="size-10">
        <ProgressBar progress={progress} />
      </div>
      <BodyText>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </BodyText>
      <Button onClick={onFarm} className="w-32" size="small">
        Claim
      </Button>
    </div>
  );
}
