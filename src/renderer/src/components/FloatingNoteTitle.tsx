import { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Renders a floating note title centered within a flex container.
 *
 * @param className - Additional CSS classes to apply to the container.
 * @param props - Other props to pass to the div element.
 * @returns A JSX element displaying the note title.
 */
export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<"div">): JSX.Element => {
  const title = "Note Title";

  return (
    <div className={twMerge("flex justify-center", className)} {...props}>
      <span className="text-[#6f6f78]">{title}</span>
    </div>
  );
};
