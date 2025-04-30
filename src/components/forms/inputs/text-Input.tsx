import React, { forwardRef } from "react";
import classNames from "classnames";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, className, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      {label && (
        <label htmlFor={rest.name} className="font-semibold text-xs md:text-sm">
          {label}
        </label>
      )}
     <input
          {...rest}
          ref={ref}
          className={classNames(
            "border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1",
            className,
            {
              "border-red-500": !!error,
            }
          )}
        />
      {error && (
        <span className="mt-1 text-xs text-red-500 transition-opacity duration-300">
          {error}
        </span>
      )}
    </div>
  );
});

export default TextInput;
