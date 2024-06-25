import clsx from "clsx";
import { LegacyRef, forwardRef } from "react";

type TProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const classes = {
  input:
    "appearance-none bg-transparent block w-full rounded-2xl border border-[#E2DAEC] border-opacity-25 p-4",
};

const Input = forwardRef(
  (
    { className, ...props }: TProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <input ref={ref} className={clsx(classes.input, className)} {...props} />
    );
  }
);

export default Input;
