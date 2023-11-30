import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  variant?: "light" | "dark";
};

export default function Spinner({ className, variant = "dark" }: SpinnerProps) {
  return (
    <span
      className={cn(
        "h-full w-auto inline-block aspect-square rounded-full border-2 animate-spin",
        variant === "light"
          ? "border-black dark:border-white"
          : "border-white dark:border-black",
        className,
        "!border-t-transparent"
      )}
    />
  );
}
