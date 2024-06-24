import clsx from "clsx";
import { LegacyRef, forwardRef } from "react";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > {
  value?: number;
}

const Slider = forwardRef(
  (
    { className, value, ...props }: IProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="range"
          {...props}
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
