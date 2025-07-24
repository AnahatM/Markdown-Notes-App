import { CreateNote, DeleteNote, GetNotes, ReadNoteFile, WriteNoteFile } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      getNotes: GetNotes;
      readNoteFile: ReadNoteFile;
      writeNoteFile: WriteNoteFile;
      createNote: CreateNote;
      deleteNote: DeleteNote;
    };
  }
}
