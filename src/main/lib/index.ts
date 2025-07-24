import { appDirectoryName, fileEncoding } from "@shared/constants";
import { NoteInfo } from "@shared/models";
import { CreateNote, DeleteNote, GetNotes, ReadNoteFile, WriteNoteFile } from "@shared/types";
import { dialog } from "electron";
import { ensureDir, readdir, readFile, remove, stat, writeFile, writeFileSync } from "fs-extra";
import { homedir } from "os";
import path from "path";

export const getRootDirectory = (): string => {
  return `${homedir()}${path.sep}${appDirectoryName}`;
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
  const fileStats = await stat(`${getRootDirectory()}${path.sep}${fileName}`);

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

  return readFile(`${rootDirectory}${path.sep}${fileName}.md`, {
    encoding: fileEncoding
  });
};

/**
 * Writes content to a note file with the specified title.
 * It constructs the file path and writes the content with a specific encoding.
 *
 * @param filename - The title of the note file (without extension).
 * @param content - The content to write to the note file.
 * @returns A promise that resolves when the write operation is complete.
 */
export const writeNoteFile: WriteNoteFile = async (filename, content) => {
  const rootDirectory = getRootDirectory();

  console.info(`Writing note file: ${rootDirectory}${path.sep}${filename}.md`);

  return writeFile(`${rootDirectory}${path.sep}${filename}.md`, content, {
    encoding: fileEncoding
  });
};

/**
 * Creates a new note file with a unique title.
 * It prompts the user to select a location and name for the new note file.
 * If the user cancels or provides an invalid path, it returns false.
 *
 * @returns A promise that resolves to the title of the newly created note or false if creation failed.
 */
export const createNote: CreateNote = async () => {
  const rootDirectory = getRootDirectory();

  await ensureDir(rootDirectory);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: "New Note",
    defaultPath: `${rootDirectory}${path.sep}Untitled.md`,
    buttonLabel: "Create",
    properties: ["showOverwriteConfirmation"],
    showsTagField: false,
    filters: [
      {
        name: "Markdown",
        extensions: ["md"]
      }
    ]
  });

  if (canceled || !filePath) {
    console.info("Note creation canceled or no file path provided.");
    return false;
  }

  const { name: filename, dir: parentDir } = path.parse(filePath);

  if (parentDir !== rootDirectory) {
    await dialog.showMessageBox({
      type: "error",
      title: "Creation Failed",
      message:
        "Note file must be created in the application's root directory. Avoid using other folders."
    });
    console.warn(`Note file path is not in the expected directory: ${parentDir}`);
    return false;
  }

  console.info(`Creating note file: ${filePath}`);

  await writeFileSync(filePath, "");

  return filename;
};

/**
 * Deletes a note file by its title.
 * It prompts the user for confirmation before deleting the file.
 * If the user cancels, it returns false; otherwise, it deletes the file and returns true.
 *
 * @param filename - The title of the note file (without extension).
 * @returns A promise that resolves to true if the deletion was successful, false otherwise.
 */
export const deleteNote: DeleteNote = async (filename) => {
  const rootDirectory = getRootDirectory();

  const { response } = await dialog.showMessageBox({
    type: "warning",
    title: "Delete Note",
    message: `Are you sure you want to delete the note "${filename}"?`,
    buttons: ["Delete", "Cancel"], // 0 is "Delete", 1 is "Cancel"
    defaultId: 1, // Default to "Cancel"
    cancelId: 1
  });

  if (response === 1) {
    console.info("Note deletion canceled.");
    return false;
  }

  console.info(`Deleting note file: ${filename} from ${rootDirectory}`);

  const filePath = `${rootDirectory}${path.sep}${filename}.md`;
  await remove(filePath);

  return true;
};
