import { DeleteNoteButton, NewNoteButton } from "@/components";
import { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

/**
 * ActionButtonsRow component renders a column of action buttons for note management.
 * It includes buttons to create a new note and delete the current note.
 *
 * @param props - Additional properties to pass to the div container.
 * @returns JSX.Element - The rendered action buttons column.
 */
export const ActionButtonsRow = ({ className, ...props }: ComponentProps<"div">): JSX.Element => {
  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  );
};
