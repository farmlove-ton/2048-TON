import React, { forwardRef } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

import { BodyTextSemibold } from "./Text";

interface OutlineCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

const OutlineCheckbox: React.FC<OutlineCheckboxProps> = forwardRef(
  ({ label, ...rest }, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <label className="flex items-center justify-between appearance-none bg-transparent w-full rounded-2xl border border-opacity-25 border-[#E2DAEC] p-4 focus:outline-none focus:border-gray-500 cursor-pointer">
        <BodyTextSemibold>{label}</BodyTextSemibold>

        <div className="relative h-5 w-5">
          <input
            ref={ref}
            type="checkbox"
            className="peer appearance-none h-5 w-5 border border-[#E2DAEC] border-opacity-25 rounded-md checked:bg-[#7000a0] checked:border-transparent focus:outline-none"
            {...rest}
          />
          <CheckIcon className="w-4 h-4 absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden" />
        </div>
      </label>
    );
  }
);

export default OutlineCheckbox;
