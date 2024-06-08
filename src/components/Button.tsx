import classNames from "classnames";

type TProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const classes = {
  button:
    "rounded-lg border border-transparent px-4 py-2 text-base font-medium bg-gray-[#f9f9f9] cursor-pointer transition-colors duration-200 hover:border-blue-500 focus:outline-none dark:bg-[#1a1a1a]",
};

const Button = ({ type = "button", className, ...props }: TProps) => {
  return (
    <button
      className={classNames(classes.button, className)}
      type={type}
      {...props}
    />
  );
};

export default Button;
