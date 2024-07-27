import clsx from "clsx";

type TProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: TColors;
  variant?: TVariants;
  size?: TSize;
};

type TVariants = "text" | "outlined" | "contained";
type TColors = "default" | "secondary" | "pink";
type TSize = "small" | "normal";

const classes = {
  button:
    "rounded-2xl font-medium cursor-pointer transition-colors duration-200 focus:outline-none hover:opacity-90",
  small: "text-xs py-1 px-4",
  normal: "text-base py-2 px-4",
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
  size = "normal",
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
        classes[size],
        className
      )}
      type={type}
      {...props}
    />
  );
};

export default Button;
