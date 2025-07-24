import { appDirectoryName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { GetNotes, ReadNoteFile } from "@shared/types";
import { ensureDir, readdir, readFile, stat } from "fs-extra";
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

/**
 * Retrieves note information from a file name.
 * It reads the file's last modified time and constructs a NoteInfo object.
 *
 * @param fileName - The name of the note file.
 * @returns A promise that resolves to a NoteInfo object containing the title and last edit time.
 */
export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDirectory()}/${fileName}`);

  return {
    title: fileName.replace(".md", ""),
    lastEditTimeMs: fileStats.mtimeMs
  };
};

/**
 * Reads the content of a note file by its name.
 * It constructs the file path and reads the file with a specific encoding.
 *
 * @param fileName - The name of the note file (without extension).
 * @returns A promise that resolves to the content of the note file.
 */
export const readNoteFile: ReadNoteFile = async (fileName: string): Promise<string> => {
  const rootDirectory = getRootDirectory();

  return readFile(`${rootDirectory}/${fileName}.md`, {
    encoding: fileEncoding
  });
};
