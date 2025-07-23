/**
 * Type for meta information about a note.
 */
export type NoteInfo = {
  /** The title of the note. */
  title: string;
  /** Last edit time in milliseconds since epoch. */
  lastEditTimeMs: number;
};

/**
 * Type for note content, representing the markdown text for each note.
 */
export type NoteContent = string;
