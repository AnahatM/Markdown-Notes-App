import { GetNotes } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated)
  throw new Error("Context isolation is not enabled. Please enable it in your main process.");

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language || "en-US",
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("getNotes", ...args)
  });
} catch (error) {
  console.error("Failed to expose context in main world:", error);
}
