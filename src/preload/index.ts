import { contextBridge } from "electron";

if (!process.contextIsolated)
  throw new Error("Context isolation is not enabled. Please enable it in your main process.");

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language || "en-US"
  });
} catch (error) {
  console.error("Failed to expose context in main world:", error);
}
