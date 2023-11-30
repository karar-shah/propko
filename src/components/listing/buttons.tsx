import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import React from "react";
import { useListingStore } from "./listing-store";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};
export function NextButton({ className, children, loading, ...props }: Props) {
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

export function PrevButton({ className }: { className?: string }) {
  const { handlePrevStep } = useListingStore();
  return (
    <Button
      type="button"
      onClick={handlePrevStep}
      variant={"ghost"}
      size={"icon"}
      className={cn("w-10 h-10", className)}
    >
      <ChevronLeftIcon className="w-full h-full" />
    </Button>
  );
}

export function SaveAndExitButton({ className }: { className?: string }) {
  return (
    <Button variant="primary" className={cn("rounded-full w-auto px-8", className)}>
      Save & Exit
    </Button>
  );
}
