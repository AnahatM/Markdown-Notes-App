import { notesMock } from "@/store/mocks";
import { NoteInfo } from "@shared/models";
import { atom } from "jotai";

/**
 * Atom to manage the state of notes in the application.
 */
export const notesAtom = atom<NoteInfo[]>(notesMock);

/**
 * Atom to manage the currently selected note.
 * It can be null if no note is selected.
 */
export const selectedNoteIndexAtom = atom<number | null>(null);

/**
 * Atom to derive the selected note based on the selected index.
 * If no note is selected, it returns null.
 * If a note is selected, it returns the corresponding note object.
 */
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  // If no note is selected, return null
  // This prevents errors when trying to access properties of a null object.
  if (selectedNoteIndex == null) return null;

  // If a note is selected, get the corresponding note object by index
  const selectedNote = notes[selectedNoteIndex];

  return { ...selectedNote, content: `hello from ${selectedNoteIndex}` };
});
