import { BodyTextThin } from "./Text";

interface IProps {
  error?: string;
  children: React.ReactNode;
  direction?: "col" | "row";
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

const classes = {
  error: "flex items-center text-red-500",
};

const WithError = ({ error, children }: IProps) => {
  return (
    <div>
      {children}

      {!!error && (
        <BodyTextThin className={classes.error}>{error}</BodyTextThin>
      )}
    </div>
  );
};

export default WithError;
