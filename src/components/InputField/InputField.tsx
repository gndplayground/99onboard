import clsx from "clsx";
import React, { InputHTMLAttributes, useId } from "react";

export interface InputFieldProps {
  label: string | React.ReactNode;
  error?: string | React.ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  multiline?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  inputProps = {},
  className,
  multiline,
}) => {
  const genId = useId();

  const id = inputProps.id || genId;

  const inputClassName =
    "input-field w-full  px-4 py-2 border-2 border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <div className={className}>
      <div
        className={clsx(
          inputProps.type === "checkbox"
            ? "flex flex-row-reverse justify-end"
            : "",
          className,
        )}
      >
        <label
          htmlFor={id}
          className={
            inputProps.type === "checkbox" ? "form-checkbox" : "block mb-1"
          }
        >
          {label}
        </label>

        {multiline ? (
          <textarea
            {...inputProps}
            id={id}
            className={clsx(
              inputClassName,
              "resize-none",
              inputProps.className,
            )}
            aria-describedby={`${id}-error`}
            aria-invalid={error ? "true" : "false"}
          />
        ) : (
          <input
            {...inputProps}
            id={id}
            className={clsx(
              inputProps.type === "checkbox" ? "form-checkbox" : inputClassName,
              inputProps.className,
            )}
            aria-describedby={`${id}-error`}
            aria-invalid={error ? "true" : "false"}
          />
        )}
      </div>
      {error && (
        <span
          aria-live="polite"
          id={`${id}-error`}
          className="pl-2 mt-2 text-red-600 text-xs semi-bold"
        >
          {error}
        </span>
      )}
    </div>
  );
};
