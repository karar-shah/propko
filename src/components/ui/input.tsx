import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [pwdVisble, setPwdVisible] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={type === "password" ? (pwdVisble ? "text" : "password") : type}
          className={cn(
            "h-12 py-3 px-4 block w-full border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primaryborder-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",
            "text-sm text-secondary-900 dark:text-secondary-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setPwdVisible(!pwdVisble)}
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            {pwdVisble ? (
              <EyeNoneIcon className="w-5 h-5" />
            ) : (
              <EyeOpenIcon className="w-5 h-5" />
            )}
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
