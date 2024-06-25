import { PlusIcon } from "@heroicons/react/16/solid";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

type TProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "multiple" | "onChange" | "value"
> & {
  onChange: (files: File[] | null) => void;
};

const FileUploader = forwardRef<HTMLInputElement, TProps>(
  ({ onChange, ...props }, ref) => {
    const hiddenInputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref as Ref<{ click: () => void }> | null, () => ({
      click: () => {
        if (
          hiddenInputRef &&
          typeof hiddenInputRef !== "function" &&
          typeof hiddenInputRef !== "string" &&
          hiddenInputRef.current
        ) {
          hiddenInputRef.current.click();
        }
      },
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.files && Array.from(event.target.files));
    };

    const handleClick = () => {
      if (
        hiddenInputRef &&
        typeof hiddenInputRef !== "function" &&
        typeof hiddenInputRef !== "string" &&
        hiddenInputRef.current
      ) {
        hiddenInputRef.current.click();
      }
    };

    return (
      <div className="w-full h-full">
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
    );
  }
);

export default FileUploader;
