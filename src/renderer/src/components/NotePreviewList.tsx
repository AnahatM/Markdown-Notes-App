import { NotePreview } from "@/components";
import { notesMock } from "@/store/mocks";
import { ComponentProps, JSX } from "react";
import { twMerge } from "tailwind-merge";

/**
 * NotePreviewList component renders a list of note previews.
 * Each note is displayed with its title and last edit time.
 *
 * @returns {JSX.Element} The rendered list of note previews.
 */
export const NotePreviewList = ({ className, ...props }: ComponentProps<"ul">): JSX.Element => {
  // If there are no notes, display a message
  if (!notesMock || notesMock.length === 0) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    );
  }

  // Map through the notesMock array to render each NotePreview component
  return (
    <ul className={twMerge("mt-2", className)} {...props}>
      {notesMock.map((note) => (
        <NotePreview key={note.title + note.lastEditTimeMs} {...note} />
      ))}
    </ul>
  );
};
