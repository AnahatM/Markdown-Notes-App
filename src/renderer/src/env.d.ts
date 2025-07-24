/// <reference types="vite/client" />

import { GetNotes, ReadNoteFile, WriteNoteFile } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      getNotes: GetNotes;
      readNoteFile: ReadNoteFile;
      writeNoteFile: WriteNoteFile;
    };
  }
}

export {};
