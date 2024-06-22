import React, { ReactNode } from "react";
import clsx from "clsx";

type TextProps = {
  children: ReactNode;
  as?: React.ElementType;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  color?: string;
  className?: string;
};

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightClasses = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const Text: React.FC<TextProps> = ({
  children,
  as: Component = "p",
  size = "base",
  weight = "normal",
  color = "white",
  className,
}) => {
  return (
    <Component
      className={clsx(
        sizeClasses[size],
        weightClasses[weight],
        color,
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Text;
