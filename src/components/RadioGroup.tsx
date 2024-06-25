import React, { forwardRef } from "react";
import { BodyText } from "./Text";
import { CheckIcon } from "@heroicons/react/16/solid";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = forwardRef(
  (
    { name, options, value, onChange },
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <div className="relative h-6 w-6">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="appearance-none border-[0.75px] border-white rounded-full h-6 w-6 checked:bg-[#6262D9] checked:border-transparent focus:outline-none"
              />
              {value === option.value && (
                <CheckIcon className="w-4 h-4 absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <BodyText>{option.label}</BodyText>
          </label>
        ))}
      </div>
    );
  }
);

export default RadioGroup;
