import Button from "../Button";
import { BodyText } from "../Text";
import ProgressBar from "./components/ProgressBar";
import { useFarmBar } from "./useFarmBar";

interface IProps {
  onFarm: () => void;
  farmCounter: number;
  maxCounter: number;
  initialTimeLeft: number;
}

export default function FarmBar({
  onFarm,
  farmCounter,
  maxCounter,
  initialTimeLeft,
}: IProps) {
  const { progress, timeLeft } = useFarmBar({
    farmCounter,
    maxCounter,
    initialTimeLeft,
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
        Collect
      </Button>
    </div>
  );
}
