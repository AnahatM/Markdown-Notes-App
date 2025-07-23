import { ActionButton, ActionButtonProps } from "@/components";
import { JSX } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

/**
 * DeleteNoteButton component
 * This component renders a button for deleting notes with specific styles.
 * It uses the ActionButton component and includes an icon and label.
 *
 * @param props - Props for the button
 * @returns DeleteNoteButton JSX Element
 */
export const DeleteNoteButton = ({ ...props }: ActionButtonProps): JSX.Element => {
  return (
    <ActionButton
      icon={<FaRegTrashCan className="w-4 h-4 text-zinc-300" />}
      label="Delete"
      {...props}
    />
  );
};
