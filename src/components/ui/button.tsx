import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "w-full border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
        destructive:
          "bg-red-500 text-secondary-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-secondary-50 dark:hover:bg-red-900/90",
        outline:
          "border border-secondary-200 bg-transparent shadow-sm hover:bg-secondary-100 hover:text-secondary-900 dark:border-secondary-800 dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
        secondary:
          "bg-secondary-100 text-secondary-900 shadow-sm hover:bg-secondary-100/80 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-800/80",
        ghost:
          "hover:bg-secondary-100 text-secondary-900 dark:text-secondary-50 hover:text-secondary-900 dark:hover:bg-secondary-800 dark:hover:text-secondary-50",
        link: "text-secondary-900 underline-offset-4 hover:underline dark:text-secondary-50",
      },
      size: {
        default: "h-12 py-3 px-4 gap-x-2 text-sm font-semibold rounded-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const GoogleSigninButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-secondary-200 bg-white text-secondary-800 shadow-sm hover:bg-secondary-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-secondary-900 dark:border-secondary-700 dark:text-white dark:hover:bg-primary/5 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-secondary-600"
        {...props}
      >
        <svg
          className="w-4 h-auto"
          width="46"
          height="47"
          viewBox="0 0 46 47"
          fill="none"
        >
          <path
            d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
            fill="#4285F4"
          />
          <path
            d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
            fill="#34A853"
          />
          <path
            d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
            fill="#FBBC05"
          />
          <path
            d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
            fill="#EB4335"
          />
        </svg>
        Continue with Google
      </button>
    );
  }
);
GoogleSigninButton.displayName = "GoogleSigninButton";

export { Button, buttonVariants, GoogleSigninButton };
