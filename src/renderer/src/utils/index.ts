import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Format a date using Intl.DateTimeFormat for consistent display across the application.
 */
const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "UTC"
});

/**
 * Utility function to format a date from milliseconds to a human-readable string.
 * It uses the Intl.DateTimeFormat API for consistent formatting.
 *
 * @param ms - The date in milliseconds since the epoch.
 * @returns A formatted date string.
 */
export const formatDateFromMs = (ms: number): string => dateFormatter.format(ms);

/**
 * Utility function to merge class names using clsx and tailwind-merge.
 * This is useful for conditionally applying Tailwind CSS classes in React components.
 *
 * @param args - Class names or conditions to apply.
 * @returns A string of merged class names.
 */
export const cn = (...args: ClassValue[]): string => twMerge(clsx(...args));
