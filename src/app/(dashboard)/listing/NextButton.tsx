import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
export default function NextButton({
  className,
  children,
  loading,
  ...props
}: Props) {
  return (
    <div className="flex items-center justify-center w-full">
      <Button
        variant="default"
        className={cn("rounded-full w-full max-w-[400px]", className)}
        {...props}
      >
        {loading ? <Spinner className="w-5 h-5" /> : children}
      </Button>
    </div>
  );
}
