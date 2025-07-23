import { NotePreview } from "@/components";
import { useNotesList } from "@/hooks/useNotesList";
import { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

/**
 * NotePreviewList component renders a list of note previews.
 * Each note is displayed with its title and last edit time.
 *
 * @returns {JSX.Element} The rendered list of note previews.
 */
export const NotePreviewList = ({ className, ...props }: ComponentProps<"ul">): JSX.Element => {
  // Use the custom hook to get notes and selected note index
  // The hook also provides a function to handle note selection
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({});

  // If there are no notes, display a message
  if (!notes || notes.length === 0) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    );
  }

  // Map through the notes array to render each NotePreview component
  return (
    <ul className={twMerge("mt-2", className)} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTimeMs}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  );
};
