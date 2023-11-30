import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type CountInputProps = {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
};

export function CountInput({ min, max, value = 0, onChange }: CountInputProps) {
  const [curValue, setCurValue] = useState<number>(value);

  useEffect(() => {
    onChange?.(curValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curValue]);

  return (
    <div className="flex items-center gap-5">
      <Button
        onClick={() => {
          const newValue = curValue - 1;
          setCurValue(
            Math.max(min || newValue, Math.min(max || newValue, newValue))
          );
        }}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <MinusIcon />
      </Button>
      <p className="text-lg font-semibold min-w-[40px] text-center">
        {curValue}
      </p>
      <Button
        onClick={() => {
          const newValue = curValue + 1;
          setCurValue(
            Math.max(min || newValue, Math.min(max || newValue, newValue))
          );
        }}
        variant="outline"
        size="icon"
        className="rounded-full"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}

type SwitchElProps = {
  options: string[];
  value?: string;
  onChange?: (value?: string) => void;
};

export function SwitchEl({ options, value, onChange }: SwitchElProps) {
  const [active, setActive] = useState(value);

  useEffect(() => {
    onChange?.(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="flex items-center">
      {options?.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setActive(opt)}
          className={cn(
            "text-base rounded-md border border-slate-200 dark:border-slate-700",
            " px-8 min-w-[180px] py-3 h-12 transition-all",
            active === opt
              ? "bg-slate-200 dark:bg-slate-700/50"
              : "hover:bg-slate-200 dark:hover:bg-slate-700/50"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
