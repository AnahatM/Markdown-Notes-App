import { createNote } from "@/lib";
import { GetNotes, ReadNoteFile, WriteNoteFile } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated)
  throw new Error("Context isolation is not enabled. Please enable it in your main process.");

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language || "en-US",
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args),
    readNoteFile: (...args: Parameters<ReadNoteFile>) =>
      ipcRenderer.invoke("readNoteFile", ...args),
    writeNoteFile: (...args: Parameters<WriteNoteFile>) =>
      ipcRenderer.invoke("writeNoteFile", ...args),
    createNote: (...args: Parameters<typeof createNote>) =>
      ipcRenderer.invoke("createNote", ...args)
  });
} catch (error) {
  console.error("Failed to expose context in main world:", error);
}
