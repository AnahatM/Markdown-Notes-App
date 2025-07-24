import { NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

/**
 * This function loads notes from the backend using the context API.
 * It retrieves the notes and sorts them by the last edit time in descending order.
 * This ensures that the most recently edited notes appear first in the list.
 *
 * @returns {Promise<NoteInfo[]>} A promise that resolves to an array of NoteInfo objects sorted by last edit time.
 */
const loadNotes = async (): Promise<NoteInfo[]> => {
  const notes = await window.context.getNotes();

  // Sort them by most recent edit time
  return notes.sort((a, b) => b.lastEditTimeMs - a.lastEditTimeMs);
};

/**
 * Atom to manage the asynchronous loading of notes.
 * It uses the loadNotes function to fetch notes from the backend.
 * The notes are initially set to a promise that resolves to an array of NoteInfo objects.
 *
 * @type {atom<NoteInfo[] | Promise<NoteInfo[]>>}
 */
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());

/**
 * Atom to manage the state of notes in the application.
 */
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev);

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
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  // If no note is selected, return null
  // This prevents errors when trying to access properties of a null object.
  if (selectedNoteIndex == null || !notes) return null;

  // If a note is selected, get the corresponding note object by index
  const selectedNote = notes[selectedNoteIndex];

  const noteContent = await window.context.readNoteFile(selectedNote.title);

  return { ...selectedNote, content: noteContent };
});

/**
 * Atom to manage the selected note in the application.
 * It unwraps the selectedNoteAtomAsync to get the actual note object.
 * This allows for easy access to the selected note's properties.
 */
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: "",
      lastEditTimeMs: Date.now(),
      content: ""
    }
);

/**
 * Atom to create a new empty note.
 * It prompts the user to create a note and updates the notes state accordingly.
 */
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);
  if (!notes) return;

  const title = `Note ${notes.length + 1}`;
  if (!title) return;

  // Create a new note object with the given title and current timestamp
  const newNote: NoteInfo = {
    title,
    lastEditTimeMs: Date.now()
  };

  // Call the context method to create the note in the backend, display it in front of the other notes
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);
  // Set the newly created note as the selected note which is first in the list
  set(selectedNoteIndexAtom, 0);
});

/**
 * Atom to delete the currently selected note.
 * It removes the note from the notes state and deselects any note.
 */
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  // Filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  );

  // Deselect any note
  set(selectedNoteIndexAtom, null);
});
