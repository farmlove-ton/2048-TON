import clsx from "clsx";

type TProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: TColors;
  variant?: TVariants;
};

type TVariants = "text" | "outlined" | "contained";
type TColors = "default" | "secondary" | "pink";

const classes = {
  button:
    "rounded-xl px-4 py-2 text-base font-medium cursor-pointer transition-colors duration-200 focus:outline-none hover:opacity-90",
};

const colorClasses: Record<TVariants, Record<TColors, string>> = {
  contained: {
    default: "text-[#1A1A1A] bg-white",
    secondary: "bg-[#FFFFFF3B] text-white",
    pink: "text-white bg-gradient-pink",
  },
  outlined: {
    default: "bg-transparent text-white border-white",
    secondary: "bg-[#FFFFFF3B] text-white",
    pink: "text-white bg-gradient-pink",
  },
  text: {
    default: "text-[#E2DAEC]",
    secondary: "bg-[#FFFFFF3B] text-white",
    pink: "text-white bg-gradient-pink",
  },
};

const variants: Record<TVariants, string> = {
  text: "text-base font-light",
  outlined: ` border ${classes.button}`,
  contained: `${classes.button}`,
};

const Button = ({
  type = "button",
  variant = "contained",
  color = "default",
  className,
  ...props
}: TProps) => {
  return (
    <button
      className={clsx(
        variants[variant],
        colorClasses[variant][color],
        className
      )}
      type={type}
      {...props}
    />
  );
};

export default Button;
