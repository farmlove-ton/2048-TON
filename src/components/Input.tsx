import classNames from "classnames";
import { LegacyRef, forwardRef } from "react";

type TProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const classes = {
  input:
    "appearance-none block w-full text-gray-700 border-b border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
};

const Input = forwardRef(
  (
    { className, ...props }: TProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <input
        ref={ref}
        className={classNames(classes.input, className)}
        {...props}
      />
    );
  }
);

export default Input;