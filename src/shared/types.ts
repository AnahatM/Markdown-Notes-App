import { NoteContent, NoteInfo } from "./models";

/**
 * Get all notes
 * Retrieves the list of note file names from the application's data directory.
 *
 * @returns A promise that resolves to an array of note file names.
 */
export type GetNotes = () => Promise<NoteInfo[]>;

/**
 * Read a note file
 * Reads the content of a note file by its title.
 *
 * @param title - The title of the note file (without extension).
 * @returns A promise that resolves to the content of the note file.
 */
export type ReadNoteFile = (title: NoteInfo["title"]) => Promise<NoteContent>;

/**
 * Write a note file
 * Writes the content to a note file with the specified title.
 *
 * @param title - The title of the note file (without extension).
 * @param content - The content to write to the note file.
 * @returns A promise that resolves when the write operation is complete.
 */
export type WriteNoteFile = (title: NoteInfo["title"], content: NoteContent) => Promise<void>;

/**
 * Create a new note
 * Creates a new note file with a unique title.
 *
 * @returns A promise that resolves to the title of the newly created note or false if creation failed.
 */
export type CreateNote = () => Promise<NoteInfo["title"] | false>;

/**
 * Delete a note
 * Deletes a note file by its title.
 *
 * @param title - The title of the note file (without extension).
 * @returns A promise that resolves to true if the deletion was successful, false otherwise.
 */
export type DeleteNote = (title: NoteInfo["title"]) => Promise<boolean>;
