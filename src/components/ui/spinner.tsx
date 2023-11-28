import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "h-full w-auto inline-block aspect-square rounded-full border-2 border-black dark:border-white animate-spin",
        className,
        "!border-t-transparent"
      )}
    />
  );
}
