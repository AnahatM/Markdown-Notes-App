/// <reference types="vite/client" />

import { GetNotes, ReadNoteFile } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      getNotes: GetNotes;
      readNoteFile: ReadNoteFile;
    };
  }
}

export {};
