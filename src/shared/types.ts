import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>;

export type ReadNoteFile = (title: NoteInfo["title"]) => Promise<NoteContent>;
