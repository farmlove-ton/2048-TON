import clsx from "clsx";
import { LegacyRef, forwardRef } from "react";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> & {
  value?: number;
};

const Slider = forwardRef(
  (
    { className, value, ...props }: TProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          type="range"
          value={value}
          className={clsx(
            className,
            "slider w-full h-1 bg-white rounded-lg appearance-none cursor-pointer"
          )}
        />

        <span className="absolute -top-4 right-0">{value}</span>
      </div>
    );
  }
);

export default Slider;
