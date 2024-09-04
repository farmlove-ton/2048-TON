import React, { forwardRef } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

import { BodyTextSemibold } from "./Text";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> & {
  label?: React.ReactNode;
  className?: string;
  isError?: boolean;
};

const OutlineCheckbox: React.FC<TProps> = forwardRef(
  (
    { label, className, isError, ...rest },
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <label
        className={clsx(
          "flex items-center justify-between appearance-none bg-transparent w-full rounded-2xl border border-opacity-25 border-[#E2DAEC] p-4 focus:outline-none focus:border-gray-500 cursor-pointer",
          isError && "border-red-500"
        )}
      >
        <BodyTextSemibold>{label}</BodyTextSemibold>

        <div className="relative h-5 w-5">
          <input
            {...rest}
            ref={ref}
            type="checkbox"
            className={clsx(
              "peer appearance-none h-5 w-5 border border-[#E2DAEC] border-opacity-25 rounded-md checked:bg-[#7000a0] checked:border-transparent focus:outline-none",
              isError && "border-red-400",
              className
            )}
          />
          <CheckIcon className="w-4 h-4 absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-checked:block hidden" />
        </div>
      </label>
    );
  }
);

export default OutlineCheckbox;
