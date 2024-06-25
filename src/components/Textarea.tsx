import clsx from "clsx";
import { forwardRef } from "react";

type TProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const classes = {
  textarea:
    "appearance-none bg-transparent block w-full rounded-2xl border border-[#E2DAEC] border-opacity-25 p-4",
};

const Textarea = forwardRef(
  ({ className, ...props }: TProps, ref: React.Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        {...props}
        className={clsx(classes.textarea, className)}
        ref={ref}
      />
    );
  }
);

export default Textarea;
