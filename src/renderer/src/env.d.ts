/// <reference types="vite/client" />

import { CreateNote, GetNotes, ReadNoteFile, WriteNoteFile } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      getNotes: GetNotes;
      readNoteFile: ReadNoteFile;
      writeNoteFile: WriteNoteFile;
      createNote: CreateNote;
    };
  }
}

export {};
