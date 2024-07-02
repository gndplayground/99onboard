import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface LocalIconButtonProps {
  variant?: string;
}

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant">,
    LocalIconButtonProps {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { children, className, ...others } = props;
    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          "p-1 text-[20px] rounded-[8px] hover:bg-gray-300 focus:bg-gray-300 transition-colors",
          className,
        )}
        {...others}
      >
        {children}
      </button>
    );
  },
);
