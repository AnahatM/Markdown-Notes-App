import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  interface Window {
    electron: ElectronAPI;
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    context: {};
  }
}
