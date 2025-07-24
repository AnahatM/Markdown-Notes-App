import { ActionButton, ActionButtonProps } from "@/components";
import { createEmptyNoteAtom } from "@renderer/store";
import { useSetAtom } from "jotai";
import { JSX } from "react";
import { LuFilePenLine } from "react-icons/lu";

/**
 * NewNoteButton component
 * This component renders a button for creating new notes with specific styles.
 * It uses the ActionButton component and includes an icon and label.
 *
 * @param props - Props for the button
 * @returns NewNoteButton JSX Element
 */
export const NewNoteButton = ({ ...props }: ActionButtonProps): JSX.Element => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom);

  const handleCreation = async (): Promise<void> => {
    await createEmptyNote();
  };

  return (
    <ActionButton
      onClick={handleCreation}
      icon={<LuFilePenLine className="w-4 h-4 text-zinc-300" />}
      label="New"
      {...props}
    />
  );
};
