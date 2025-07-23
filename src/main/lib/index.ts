import { appDirectoryName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes } from "@shared/types";
import { ensureDir, readdir, stat } from "fs-extra";
import { homedir } from "os";

export const getRootDirectory = (): string => {
  return `${homedir()}/${appDirectoryName}`;
};

/**
 * Retrieves the list of note file names from the application's root directory.
 * It ensures the directory exists and reads the files with a specific encoding.
 *
 * @returns A promise that resolves to an array of note file names.
 */
export const getNotes: GetNotes = async () => {
  const rootDirectory = getRootDirectory();

  // Ensure the root directory exists
  await ensureDir(rootDirectory);

  const notesFileNames = await readdir(rootDirectory, {
    encoding: fileEncoding,
    withFileTypes: false
  });

  const notes = notesFileNames.filter((fileName) => fileName.endsWith(".md"));

  return Promise.all(notes.map(getNoteInfoFromFileName));
};

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDirectory()}/${fileName}`);

  return {
    title: fileName.replace(".md", ""),
    lastEditTimeMs: fileStats.mtimeMs
  };
};
