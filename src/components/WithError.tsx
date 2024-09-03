import { useFormContext } from "react-hook-form";

import { BodyTextThin } from "./Text";

interface IProps {
  name: string;
  children: React.ReactNode;
  direction?: "col" | "row";
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

const classes = {
  error: "flex items-center text-red-500",
};

const WithError = ({ name, children }: IProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <>
      {children}

      {!!error && (
        <BodyTextThin className={classes.error}>
          {error.message?.toString()}
        </BodyTextThin>
      )}
    </>
  );
};

export default WithError;
