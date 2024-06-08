import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";

interface IOption<T> {
  value: T;
  label: string;
}

type IProps<T> = {
  value: T;
  placeholder: string;
  onChange: (val: string) => void;
  options: IOption<T>[];
};

const classes = {
  selectWrapper: "relative",
  select:
    "relative text-left appearance-none block w-full text-gray-700 border-b border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
  placeholder: "text-[#9ca3ae]",
  selectIconWrapper:
    "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",
  selectIcon: "h-5 w-5 text-gray-400",
  dropdown:
    "mt-1 bg-white shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",
  optionActive: "text-white bg-[#7000a0]",
  optionInactive: "",
  option: "flex cursor-default select-none relative py-2 pl-3 pr-9",
};

const Select = <T extends string>({
  value,
  placeholder,
  onChange,
  options,
}: IProps<T>) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={classes.selectWrapper}>
        <ListboxButton className={classes.select}>
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className={classes.placeholder}>{placeholder}</span>
          )}
          <span className={classes.selectIconWrapper}>
            <ChevronUpDownIcon
              className={classes.selectIcon}
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <ListboxOptions className={classes.dropdown} anchor="bottom">
          {options.map(({ label, value }) => (
            <ListboxOption
              key={value}
              value={value}
              className={({ selected }) =>
                classNames(
                  selected ? classes.optionActive : classes.optionInactive,
                  classes.option
                )
              }
            >
              {({ selected }) => (
                <div className="flex w-full items-center justify-between">
                  {label}
                  {selected && <CheckIcon className="size-5" />}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select;
