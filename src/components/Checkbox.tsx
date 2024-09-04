import clsx from "clsx";
import { forwardRef } from "react";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
> & {
  label?: React.ReactNode;
  isError?: boolean;
  required?: boolean;
};

const classes = {
  wrapper: "flex items-center space-x-2.5",
  checkbox: "flex justify-center items-center cursor-pointer",
  label: "text-sm",
  error: "rounded ring-1 ring-red-500",
};

const Checkbox = forwardRef(
  (
    { name, label, required, value, className, isError, ...rest }: TProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    const classname = clsx(
      classes.checkbox,
      className,
      isError && classes.error
    );

    return (
      <div className={classes.wrapper}>
        <input
          {...rest}
          ref={ref}
          id={name}
          name={name}
          type="checkbox"
          checked={value as unknown as boolean}
          className={classname}
          required={required}
        />
        <label
          aria-required={required}
          htmlFor={name}
          className={classes.label}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Checkbox;
