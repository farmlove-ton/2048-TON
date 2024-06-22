import clsx from "clsx";

interface IProps {
  isSelected?: boolean;
}

const classes = {
  default: "h-1 rounded-sm w-full",
  notSelected: "bg-gray-300",
  selected: "bg-[#7000a0]",
};

const Tab = ({ isSelected }: IProps) => {
  return (
    <div
      className={clsx(
        classes.default,
        isSelected ? classes.selected : classes.notSelected
      )}
    />
  );
};

export default Tab;
