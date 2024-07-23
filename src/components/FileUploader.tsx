import { PlusIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "multiple" | "onChange" | "value"
> & {
  value?: string | File;
  onChange: (files: File) => void;
};

const FileUploader = forwardRef<HTMLInputElement, TProps>(
  ({ onChange, value, ...props }, ref) => {
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref as Ref<{ click: () => void }> | null, () => ({
      click: () => {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.click();
        }
      },
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        onChange(event.target.files[0]);
      }
    };

    const handleClick = () => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.click();
      }
    };

    return (
      <>
        <div className={clsx(value ? "hidden" : "w-full h-full")}>
          <div
            onClick={handleClick}
            className="relative flex items-center justify-center w-full h-full border border-white border-opacity-25 rounded-3xl cursor-pointer"
          >
            <PlusIcon className="w-6 h-6 text-white" />
          </div>
          <input
            {...props}
            value=""
            ref={hiddenInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleChange}
          />
        </div>
        {value && (
          <div className="relative w-full h-full">
            <div className="absolute top-2 right-2">
              <Button onClick={handleClick} className="shadow-md">
                Reset
              </Button>
            </div>
            <img
              className="w-full h-full object-cover rounded-3xl"
              src={value instanceof File ? URL.createObjectURL(value) : value}
              alt="photo"
            />
          </div>
        )}
      </>
    );
  }
);

export default FileUploader;
