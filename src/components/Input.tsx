import classNames from "classnames";

type TProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const classes = {
  input:
    "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500",
};

const Input = (props: TProps) => {
  return (
    <input className={classNames(classes.input, props.className)} {...props} />
  );
};

export default Input;
