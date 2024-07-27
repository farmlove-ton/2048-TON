import { Caption } from "../../Text";

interface IProps {
  progress: number;
}

<circle
  cx="50%"
  cy="50%"
  r="40%"
  stroke="gray"
  strokeWidth="10%"
  fill="none"
/>;

const ProgressBar = ({ progress }: IProps) => {
  const radius = 50; // Radius of the smaller (progress) circle
  const strokeWidth = 2; // Stroke width of the progress circle
  const largerRadius = radius + 10; // Radius of the larger (background) circle
  const circumference = 2 * Math.PI * radius; // Circumference of the progress circle
  const strokeDashoffset = circumference - (progress / 100) * circumference; // Calculate stroke offset based on progress

  return (
    <div className="relative">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${largerRadius * 2} ${largerRadius * 2}`}
      >
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={largerRadius - 1}
          fill="none"
          stroke="gray"
          strokeOpacity="30%"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="#6262D9" // Color of the progress
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${largerRadius} ${largerRadius})`} // Rotate to start progress from the top
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Caption>{progress}%</Caption>
      </div>
    </div>
  );
};

export default ProgressBar;
