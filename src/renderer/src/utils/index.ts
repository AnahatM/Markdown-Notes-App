import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names using clsx and tailwind-merge.
 * This is useful for conditionally applying Tailwind CSS classes in React components.
 *
 * @param args - Class names or conditions to apply.
 * @returns A string of merged class names.
 */
export const cn = (...args: ClassValue[]): string => twMerge(clsx(...args));
