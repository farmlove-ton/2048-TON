import clsx from "clsx";

type TProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: keyof typeof variants;
};

const classes = {
  button:
    "rounded-xl px-4 py-2 text-base font-medium cursor-pointer transition-colors duration-200 focus:outline-none",
};

const variants = {
  outlined: "bg-transparent text-white border border-white",
  contained: "text-[#1A1A1A] bg-white",
};

const Button = ({
  type = "button",
  variant = "contained",
  className,
  ...props
}: TProps) => {
  return (
    <button
      className={clsx(classes.button, variants[variant], className)}
      type={type}
      {...props}
    />
  );
};

export default Button;
