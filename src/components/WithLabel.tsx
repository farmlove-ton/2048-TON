import clsx from "clsx";

import { BodyTextThin } from "./Text";

interface IProps {
  label: React.ReactNode;
  children: React.ReactNode;
  direction?: "col" | "row";
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

const classes = {
  col: "space-y-2",
  row: "flex items-center",
  wrapper: "w-full",
  label: "flex items-center",
};

const WithLabel = ({
  label,
  children,
  required,
  htmlFor,
  direction = "col",
  className,
}: IProps) => {
  return (
    <div
      className={clsx(
        classes.wrapper,
        direction === "col" ? classes.col : classes.row,
        className
      )}
    >
      <BodyTextThin className="text-white">
        <label
          aria-required={required}
          htmlFor={htmlFor}
          className={classes.label}
        >
          {label}
        </label>
      </BodyTextThin>

      {children}
    </div>
  );
};

export default WithLabel;
