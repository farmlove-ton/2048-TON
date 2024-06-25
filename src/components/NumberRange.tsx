import React from "react";

interface RangeProps {
  min: number;
  max: number;
  step?: number;
  value: { from: number; to: number };
  onChange: (value: { from: number; to: number }) => void;
}

const NumberRange: React.FC<RangeProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (Math.abs(newValue - value.from) < Math.abs(newValue - value.to)) {
      onChange({ from: Math.min(newValue, value.to - step), to: value.to });
    } else {
      onChange({ from: value.from, to: Math.max(newValue, value.from + step) });
    }
  };

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  return (
    <div className="w-full relative">
      <span className="absolute -top-8 right-0">
        {value.from} - {value.to}
      </span>

      <div className="absolute w-full h-1 bg-[#8E8E8E] rounded-lg" />
      <div
        className="absolute h-1 bg-white rounded-lg"
        style={{
          left: `${getPercentage(value.from)}%`,
          right: `${100 - getPercentage(value.to)}%`,
        }}
      />
      <input
        type="range"
        className="slider absolute w-full h-1 bg-transparent appearance-none pointer-events-auto"
        min={min}
        max={max}
        step={step}
        value={value.from}
        onChange={handleRangeChange}
        style={{ zIndex: 2 }}
      />
      <input
        type="range"
        className="slider absolute w-full h-1 bg-transparent appearance-none pointer-events-auto"
        min={min}
        max={max}
        step={step}
        value={value.to}
        onChange={handleRangeChange}
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default NumberRange;
