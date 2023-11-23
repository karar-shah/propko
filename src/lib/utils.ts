import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excludeField<T extends Record<string, any>, Key extends keyof T>(
  obj: T,
  keys: Key[]
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as any))
  ) as Omit<T, Key>;
}
