import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type EnumDictionnary<T extends string | symbol | number, Value> = {
  [K in T]: Value;
};
